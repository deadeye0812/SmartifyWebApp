import {useState, useMemo, useCallback, useEffect} from 'react';
import {
  Sun, CloudSun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog,
  Wind, Droplets
} from 'lucide-react';
import { generateForecast } from '../../../sites/WeatherDashboard/weather-outlook';
import { CONDITIONS } from '../../../sites/WeatherDashboard/weather-outlook';
import { WEEKDAYS } from '../../../sites/WeatherDashboard/weather-outlook';
import { formatDate } from '../../../sites/WeatherDashboard/weather-outlook';
import { useWeatherNextDaysInformation } from './WeatherNextDaysLogic';




export default function WeahterNextDays() {

    const {upcoming, weekRange} = useWeatherNextDaysInformation();

    return (
        <div className="wx-list">
        {upcoming.map((d, i) => {
          const [rangeMin, rangeMax] = weekRange;
          const span = Math.max(rangeMax - rangeMin, 1);
          const left = ((d.low - rangeMin) / span) * 100;
          const width = ((d.high - d.low) / span) * 100;
          return (
            <div className="wx-row" key={i}>
              <div>
                <span className="wx-row-day">{d.weekday}</span>
                <span className="wx-row-date wx-mono">{formatDate(d.date)}</span>
              </div>
              <d.condition.Icon size={18} color={d.condition.color} strokeWidth={1.8}/>
              <span className="wx-row-cond">{d.condition.label}</span>
              <span className="wx-row-precip wx-mono">
                <Droplets size={11} strokeWidth={2} />
                {d.precip}%
              </span>
              <div className="wx-range">
                <span className="wx-range-low wx-mono">{d.low}°</span>
                <div className="wx-range-track">
                  <div className="wx-range-fill" style={{ left: `${left}%`, width: `${width}%` }} />
                </div>
              </div>
              <span className="wx-range-high wx-mono">{d.high}°</span>
            </div>
          );
        })}
      </div>
    );
}