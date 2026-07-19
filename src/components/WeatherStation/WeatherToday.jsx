import {useState, useCallback, useEffect} from 'react';
import {
  Sun, CloudSun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog,
  Wind, Droplets
} from 'lucide-react';
import { generateForecast } from '../../sites/weather-outlook';
import { formatDate } from '../../sites/weather-outlook';
import { getCurrentTemperature } from '../../api-calls/SensorAPICalls';

export default function WeatherToday() {
    const [currentTemperature, setCurrentTemperature] = useState(0.0);
    const [days, setDays] = useState(() => generateForecast(6));
    const today = days[0];

    const checkCurrentTemperature = useCallback(async() => {
      const temperature = await getCurrentTemperature();
      setCurrentTemperature(temperature.currentTemperature);
    }, []);


    useEffect(() => {
    const tick = setInterval(() => {
      checkCurrentTemperature();
    }, 1800);
    return () => clearInterval(tick);
  }, [currentTemperature, checkCurrentTemperature]);
    

    return (
        <div className="wx-today">
          <div className="wx-today-icon">
            <today.condition.Icon size={30} color={today.condition.color} strokeWidth={1.6} />
          </div>
          <div className="wx-today-main">
            <div className="wx-today-date">{formatDate(new Date())} · Heute</div>
            <div className="wx-today-temp-row">
              <span className="wx-today-temp wx-mono">{currentTemperature}°</span>
              <span className="wx-today-cond">{today.condition.label}, Tief {today.low}°</span>
            </div>
          </div>
          <div className="wx-today-stats">
            <div className="wx-today-stat">
              <Wind size={13} strokeWidth={2} />
              <span className="wx-mono">{today.wind} km/h</span>
            </div>
            <div className="wx-today-stat">
              <Droplets size={13} strokeWidth={2} />
              <span className="wx-mono">{today.humidity}%</span>
              <span>Luftfeuchte</span>
            </div>
          </div>
        </div>
    )
}