import {useState, useMemo} from 'react';
import { generateForecast } from '../../../sites/WeatherDashboard/weather-outlook';


export function useWeatherNextDaysInformation() {
    const [days, setDays] = useState(() => generateForecast(6));
    const upcoming = days.slice(1);

    const weekRange = useMemo(() => {
    const lows = days.map((d) => d.low);
    const highs = days.map((d) => d.high);
    
    return [Math.min(...lows), Math.max(...highs)];
  }, [days]);

  return {upcoming, weekRange};
}