import {useState, useCallback, useRef, useEffect} from 'react';
import {Radar as RadarIcon} from 'lucide-react';
import { getMotion } from '../../api-calls/SensorAPICalls';

const MOTION_WINDOW_MS = 10 * 60 * 1000;

function timeAgo(ts) {
  if (!ts) return '—';
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 5) return 'gerade eben';
  if (s < 60) return `vor ${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `vor ${m} Min`;
  const h = Math.floor(m / 60);
  return `vor ${h} Std`;
}

export default function RadarCard() {
    const [now, setNow] = useState(new Date());
    const [lastMotion, setLastMotion] = useState(null);
    const [motionLog, setMotionLog] = useState([]);
    const [motionActive, setMotionActive] = useState(false);
    const motionTimeout = useRef(null);

    const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const applyReading = useCallback(async(data) => {
      const currentMotion = await getMotion();
    if (currentMotion.motion == "1") {
      const t = Date.now();
      setMotionActive(true);
      setLastMotion(t);
      setMotionLog((log) => [...log, t].filter((ts) => t - ts < MOTION_WINDOW_MS));
      clearTimeout(motionTimeout.current);
      motionTimeout.current = setTimeout(() => setMotionActive(false), 4000);
    }
  }, []);

    // --- Simulated sensor feed. Swap this block for a real API poll. ---
    useEffect(() => {
    const tick = setInterval(() => {
      setNow(new Date());
      const motionEvent = Math.random() < 0.06;
      applyReading({ motion: motionEvent });
    }, 1800);
    return () => clearInterval(tick);
  }, [applyReading]);

    return (
        <div className={`ss-motion ${motionActive ? 'triggered' : ''}`}>
        <div className="ss-radar-wrap">
          <div className="ss-radar-ring" />
          <div className="ss-radar-ring mid" />
          {!prefersReducedMotion && <div className="ss-radar-sweep" />}
          <div className="ss-radar-ring core">
            <div className="ss-radar-dot" />
          </div>
        </div>

        <div className="ss-motion-info">
          <div className="ss-card-head" style={{ marginBottom: 2 }}>
            <span className="ss-label">
              <RadarIcon size={13} color={motionActive ? 'var(--alert)' : 'var(--text-dim)'} strokeWidth={2} />
              Bewegungsmelder
            </span>
          </div>
          <div className="ss-motion-status">
            {motionActive ? 'Bewegung erkannt' : 'Ruhig — keine Bewegung'}
          </div>
          <div className="ss-motion-sub">
            Letztes Ereignis: {timeAgo(lastMotion)} · {motionLog.length} Ereignis{motionLog.length === 1 ? '' : 'se'} in den letzten 10 Min
          </div>

          <div className="ss-timeline-label">Verlauf · 10 Min</div>
          <div className="ss-timeline">
            {motionLog.map((ts, i) => {
              const pct = Math.max(0, Math.min(100, (1 - (Date.now() - ts) / MOTION_WINDOW_MS) * 100));
              return <div key={i} className="ss-tick" style={{ left: `${pct}%` }} />;
            })}
          </div>
        </div>
      </div>
    );
}