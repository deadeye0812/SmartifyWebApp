import {useState, useCallback, useEffect} from 'react';
import { mqttService } from '../../../services/SensorAPICalls';

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

export function useTemperatureInformation() {
    const [now, setNow] = useState(new Date());
    const [temp, setTemp] = useState(25.4);
    const [tempMinMax, setTempMinMax] = useState([22.4, 22.4]);
    const [tempHistory, setTempHistory] = useState([22.4]);
    const tempPath = useSparklinePath(tempHistory, tempMinMax[0] - 0.5, tempMinMax[1] + 0.5, 220, 56);

    const applyReading = useCallback(async() => {
      const currentTemperature = await mqttService.getTemperature();
      setTemp(currentTemperature.temperature);
      setTempHistory((h) => [...h.slice(-(HISTORY_LEN - 1)), currentTemperature.temperature]);
      setTempMinMax(([mn, mx]) => [Math.min(mn, currentTemperature.temperature), Math.max(mx, currentTemperature.temperature)]);
  }, []);

    // --- Simulated sensor feed. Swap this block for a real API poll. ---
    useEffect(() => {
    const tick = setInterval(() => {
      setNow(new Date());
      applyReading();
    }, 1800);
    return () => clearInterval(tick);
  }, [temp, applyReading]);

  return {temp, tempPath, tempMinMax};
}