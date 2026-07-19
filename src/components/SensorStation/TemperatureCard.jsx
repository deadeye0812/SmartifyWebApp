import {useState, useCallback, useEffect} from 'react';
import { Thermometer } from 'lucide-react';
import { getTemperature } from '../../api-calls/SensorAPICalls';

const HISTORY_LEN = 40;

//Kommt doppelt vor in beiden Cards
function useSparklinePath(values, min, max, width, height) {
  if (values.length < 2) return '';
  const range = Math.max(max - min, 0.001);
  const step = width / (HISTORY_LEN - 1);
  const offset = HISTORY_LEN - values.length;
  return values
    .map((v, i) => {
      const x = (offset + i) * step;
      const y = height - ((v - min) / range) * height;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

export default function TemperatureCard() {
    const [now, setNow] = useState(new Date());
    const [temp, setTemp] = useState(25.4);
    const [tempMinMax, setTempMinMax] = useState([22.4, 22.4]);
    const [tempHistory, setTempHistory] = useState([22.4]);
    const tempPath = useSparklinePath(tempHistory, tempMinMax[0] - 0.5, tempMinMax[1] + 0.5, 220, 56);

    const applyReading = useCallback(async() => {
      const currentTemperature = await getTemperature();
      setTemp(currentTemperature.temperature);
      setTempHistory((h) => [...h.slice(-(HISTORY_LEN - 1)), currentTemperature.temperature]);
      setTempMinMax(([mn, mx]) => [Math.min(mn, currentTemperature.temperature), Math.max(mx, currentTemperature.temperature)]);
  }, []);

    // --- Simulated sensor feed. Swap this block for a real API poll. ---
    useEffect(() => {
    const tick = setInterval(() => {
      setNow(new Date());
      applyReading();
    }, 3600);
    return () => clearInterval(tick);
  }, [temp, applyReading]);

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