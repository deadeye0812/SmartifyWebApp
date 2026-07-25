import {useEffect, useState} from 'react';
import { generateForecast } from '../../../sites/weather-outlook';

export function useWeatherHeaderInformation() {
    const [days, setDays] = useState(() => generateForecast(6));
    const [updatedAt, setUpdatedAt] = useState(new Date());
    const [spinning, setSpinning] = useState(false);

    const refresh = () => {
    setSpinning(true);
    //make an api call to update the weather by replacing 'generateForecast' method with an api call
    setDays(generateForecast(6));
    setUpdatedAt(new Date());
    setTimeout(() => setSpinning(false), 600);
  };

  // Simulated periodic refresh — swap for a real API poll.
    useEffect(() => {
      const t = setInterval(() => {
        setDays(generateForecast(6));
        setUpdatedAt(new Date());
      }, 45000);
      return () => clearInterval(t);
    }, []);

    return {refresh, spinning, updatedAt}
}

