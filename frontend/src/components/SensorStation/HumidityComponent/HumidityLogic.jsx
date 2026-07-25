import {useState, useCallback, useEffect} from 'react';
import { mqttService } from '../../../services/SensorAPICalls';

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

export function useHumidityInformation() {

    const [now, setNow] = useState(new Date());
    const [hum, setHum] = useState(47.5);
    const [humMinMax, setHumMinMax] = useState([47.5, 47.5]);
    const [humHistory, setHumHistory] = useState([47.5]);
    const humPath = useSparklinePath(humHistory, humMinMax[0] - 2, humMinMax[1] + 2, 220, 56);

    const applyReading = useCallback(async(data) => {
      const currentHumidity = await mqttService.getHumidity();
      setHum(currentHumidity.humidity);
      setHumHistory((h) => [...h.slice(-(HISTORY_LEN - 1)), currentHumidity.humidity]);
      setHumMinMax(([mn, mx]) => [Math.min(mn, currentHumidity.humidity), Math.max(mx, currentHumidity.humidity)]);
  }, []);
  
    useEffect(() => {
    const tick = setInterval(() => {
      setNow(new Date());
      const nextHum = Math.min(65, Math.max(30, hum + (Math.random() - 0.5) * 1.2));
      applyReading({ humidity: nextHum });
    }, 3600);
    return () => clearInterval(tick);
  }, [hum, applyReading]);

  return {hum, humMinMax, humPath};
}



    