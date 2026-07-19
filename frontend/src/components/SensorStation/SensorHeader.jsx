import {useState} from 'react';
import { Wifi } from 'lucide-react';

function formatClock(d) {
  return d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function SensorDashboardHeader() {
    const [connected, setConnected] = useState(true);
    const [now, setNow] = useState(new Date());

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