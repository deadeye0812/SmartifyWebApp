import {useState, useCallback, useEffect} from 'react';
import { generateForecast } from '../../../sites/weather-outlook';
import { meteoService } from '../../../services/SensorAPICalls';

export function useWeatherTodayInformation() {
    const [currentTemperature, setCurrentTemperature] = useState(0.0);
    const [days, setDays] = useState(() => generateForecast(6));
    const today = days[0];

    const checkCurrentTemperature = useCallback(async() => {
      const temperature = await meteoService.getCurrentTemperature();
      setCurrentTemperature(temperature.currentTemperature);
    }, []);


    useEffect(() => {
    const tick = setInterval(() => {
      checkCurrentTemperature();
    }, 1800);
    return () => clearInterval(tick);
  }, [currentTemperature, checkCurrentTemperature]);

  return {today, currentTemperature};
}