import {useState, useCallback, useEffect, useRef} from 'react';
import { mqttService } from '../../../services/SensorAPICalls';

const MOTION_WINDOW_MS = 10 * 60 * 1000;

export function timeAgo(ts) {
  if (!ts) return '—';
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 5) return 'gerade eben';
  if (s < 60) return `vor ${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `vor ${m} Min`;
  const h = Math.floor(m / 60);
  return `vor ${h} Std`;
}

export function useRadarInformation() {
    const [now, setNow] = useState(new Date());
    const [lastMotion, setLastMotion] = useState(null);
    const [motionLog, setMotionLog] = useState([]);
    const [motionActive, setMotionActive] = useState(false);
    const motionTimeout = useRef(null);

    const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const applyReading = useCallback(async(data) => {
      const currentMotion = await mqttService.getMotion();
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

  return {motionActive, prefersReducedMotion, lastMotion, motionLog, MOTION_WINDOW_MS};
}