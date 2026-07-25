import { Wifi } from 'lucide-react';
import { useSensorHeaderInformation } from './SensorHeaderLogic';
import { formatClock } from './SensorHeaderLogic';

export default function SensorDashboardHeader() {
    const {connected, now} = useSensorHeaderInformation();

    return(
        <header className="ss-header">
        <div className="ss-title-block">
          <div>
            <div className="ss-eyebrow">Sensor Station</div>
            <div className="ss-title">Klima &amp; Bewegung — Wohnraum</div>
          </div>
        </div>
        <div className="ss-status">
          <span className={`ss-dot ${connected ? '' : 'down'}`} />
          <Wifi size={13} strokeWidth={2} />
          <span>{connected ? 'Verbunden' : 'Verbindung instabil'}</span>
          <span className="ss-mono ss-clock">{formatClock(now)}</span>
        </div>
      </header>
    );
}