import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { generateForecast } from '../../../sites/weather-outlook';
import { useWeatherHeaderInformation } from './WeatherHeaderLogic';

export default function WeatherHeader() {
    const {refresh, spinning, updatedAt} = useWeatherHeaderInformation();

    return (
        <header className="wx-header">
        <div>
          <div className="wx-eyebrow">Wetterprognose</div>
          <div className="wx-title">Nächste Tage</div>
        </div>
        <button className={`wx-refresh ${spinning ? 'spin' : ''}`} onClick={refresh}>
          <RefreshCw size={12} strokeWidth={2} />
          <span className="wx-mono">{updatedAt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</span>
        </button>
      </header>
    )
}