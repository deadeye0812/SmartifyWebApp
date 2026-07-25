import { Thermometer } from 'lucide-react';
import { useTemperatureInformation } from './TemperatureLogic';

export default function TemperatureCard() {
    const {temp, tempPath, tempMinMax} = useTemperatureInformation();

    return (
        <div className="ss-card">
          <div className="ss-card-head">
            <span className="ss-label">
              <Thermometer size={13} color="var(--warm)" strokeWidth={2} />
              Temperatur
            </span>
          </div>
          <div className="ss-reading">
            <span className="ss-value ss-mono" style={{ color: 'var(--warm)' }}>
              {temp}
            </span>
            <span className="ss-unit ss-mono">°C</span>
          </div>
          <svg className="ss-spark" viewBox="0 0 220 56" width="100%" height="56" preserveAspectRatio="none">
            <path d={tempPath} fill="none" stroke="var(--warm)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="ss-minmax ss-mono">
            <span>MIN {tempMinMax[0].toFixed(1)}°</span>
            <span>MAX {tempMinMax[1].toFixed(1)}°</span>
          </div>
        </div>
    );
}