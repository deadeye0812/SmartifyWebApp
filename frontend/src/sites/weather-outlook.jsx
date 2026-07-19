import {Sun, CloudSun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog} from 'lucide-react';
import WeatherHeader from '../components/WeatherStation/WeatherHeader';
import WeatherToday from '../components/WeatherStation/WeatherToday';
import WeahterNextDays from '../components/WeatherStation/WeatherNextDays';
import { getAllDates, getPrecipitationOfAllDates, getTemperatureForNext5Days } from '../api-calls/SensorAPICalls';
import {useCallback} from 'react';
import { getMinMaxTemperatureNext5Days } from '../api-calls/ApiFormatFunctions';

// ---------------------------------------------------------------------------
// Weather Outlook — today's conditions plus a multi-day forecast.
//
// This component SIMULATES forecast data locally so it works standalone.
// To wire it to a real source, replace `generateForecast()` with a fetch to
// a weather API, e.g. Open-Meteo (no key required):
//
//   const res = await fetch(
//     `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
//     `&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
//     `&current_weather=true&timezone=auto`
//   );
//   const data = await res.json();
//
// then map `data.daily.*` arrays into the `days` shape used below.
// ---------------------------------------------------------------------------

export const CONDITIONS = [
  { key: 'clear', label: 'Klar', Icon: Sun, color: 'var(--warm)' },
  { key: 'partly', label: 'Leicht bewölkt', Icon: CloudSun, color: 'var(--warm)' },
  { key: 'cloudy', label: 'Bewölkt', Icon: Cloud, color: 'var(--text-dim)' },
  { key: 'rain', label: 'Regen', Icon: CloudRain, color: 'var(--cool)' },
  { key: 'storm', label: 'Gewitter', Icon: CloudLightning, color: 'var(--alert)' },
  { key: 'snow', label: 'Schnee', Icon: CloudSnow, color: 'var(--cool)' },
  { key: 'fog', label: 'Nebel', Icon: CloudFog, color: 'var(--text-dim)' },
];

export const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

const getMinMaxTemperatures = async() => {
    const minMaxObjects = await getTemperatureForNext5Days();
    const objects = minMaxObjects.temperatureForNext5Days;

    const out = [];
    for(let i = 0; i < 6; i++) {
      const object1 = objects[`temperatures${i}`];
      const min = object1[0];
      const max = object1[1];
      out.push({
        min: min,
        max: max
      });
    }
    return out;
  }

  const minMaxTemperatures = await getMinMaxTemperatures();


const getPrecipitationDates = async() => {
  const result = await getPrecipitationOfAllDates();
  const precipitations = result.allDates;

  const out = [];
  for(let i = 0; i < 6; i++) {
    const preciption = precipitations[`preciption${i}`];
    out.push({
      preciption: preciption
    })
  }
  return out;
}

const precipitations = await getPrecipitationDates();

//Simulierte Pseudo API call function, soll durch eine richtige ersetzt werden
  export function generateForecast(days) {
  const today = new Date();
  let baseHigh;
  let baseLow;
  const out = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    baseHigh = minMaxTemperatures[i].max;
    baseLow = minMaxTemperatures[i].min;
    const precip = precipitations[i].preciption;
    let condKey = 'clear';
    if (precip > 70) condKey = Math.random() > 0.7 ? 'storm' : 'rain';
    else if (precip > 40) condKey = 'rain';
    else if (precip > 20) condKey = 'cloudy';
    else condKey = Math.random() > 0.5 ? 'partly' : 'clear';
    if (baseLow < 1 && precip > 30) condKey = 'snow';
    const cond = CONDITIONS.find((c) => c.key === condKey) || CONDITIONS[0];
    out.push({
      date,
      weekday: i === 0 ? 'Heute' : WEEKDAYS[date.getDay()],
      high: Math.round(baseHigh),
      low: Math.round(baseLow),
      precip,
      wind: Math.round(6 + Math.random() * 18),
      humidity: Math.round(40 + Math.random() * 35),
      condition: cond,
    });
  }
  return out;
}

export function formatDate(d) {
  return d.toLocaleDateString('de-DE', { weekday: undefined, day: '2-digit', month: 'short' });
}

export default function WeatherOutlook() {

  return (
    <div className="wx-root">
      <WeatherHeader/>

      <WeatherToday/>

      <WeahterNextDays/>
    </div>
  );
}
