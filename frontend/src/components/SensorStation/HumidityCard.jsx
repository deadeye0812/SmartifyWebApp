import {useState, useCallback, useEffect} from 'react';
import { Droplets } from 'lucide-react';
import { getHumidity } from '../../api-calls/SensorAPICalls';

const HISTORY_LEN = 40;

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

export default function HumidityCard() {
    const [now, setNow] = useState(new Date());
    const [hum, setHum] = useState(47.5);
    const [humMinMax, setHumMinMax] = useState([47.5, 47.5]);
    const [humHistory, setHumHistory] = useState([47.5]);
    const humPath = useSparklinePath(humHistory, humMinMax[0] - 2, humMinMax[1] + 2, 220, 56);

    const applyReading = useCallback(async(data) => {
      const currentHumidity = await getHumidity();
      setHum(currentHumidity.humidity);
      setHumHistory((h) => [...h.slice(-(HISTORY_LEN - 1)), currentHumidity.humidity]);
      setHumMinMax(([mn, mx]) => [Math.min(mn, currentHumidity.humidity), Math.max(mx, currentHumidity.humidity)]);
  }, []);

    // --- Simulated sensor feed. Swap this block for a real API poll. ---
    useEffect(() => {
    const tick = setInterval(() => {
      setNow(new Date());
      const nextHum = Math.min(65, Math.max(30, hum + (Math.random() - 0.5) * 1.2));
      applyReading({ humidity: nextHum });
    }, 1800);
    return () => clearInterval(tick);
  }, [hum, applyReading]);

    return (
        <div className="ss-card">
          <div className="ss-card-head">
            <span className="ss-label">
              <Droplets size={13} color="var(--cool)" strokeWidth={2} />
              Luftfeuchtigkeit
            </span>
          </div>
          <div className="ss-reading">
            <span className="ss-value ss-mono" style={{ color: 'var(--cool)' }}>
              {hum}
            </span>
            <span className="ss-unit ss-mono">%</span>
          </div>
          <svg className="ss-spark" viewBox="0 0 220 56" width="100%" height="56" preserveAspectRatio="none">
            <path d={humPath} fill="none" stroke="var(--cool)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="ss-minmax ss-mono">
            <span>MIN {humMinMax[0].toFixed(0)}%</span>
            <span>MAX {humMinMax[1].toFixed(0)}%</span>
          </div>
        </div>
    );
}