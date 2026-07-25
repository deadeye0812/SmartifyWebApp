import {useState, useCallback, useRef, useEffect} from 'react';
import {Radar as RadarIcon} from 'lucide-react';
import { mqttService } from '../../../services/SensorAPICalls';
import { useRadarInformation } from './RadarLogic';
import { timeAgo } from './RadarLogic';

export default function RadarCard() {
    const {motionActive, prefersReducedMotion, lastMotion, motionLog, MOTION_WINDOW_MS} = useRadarInformation();

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