import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { generateForecast } from '../../sites/weather-outlook';

export default function WeatherHeader() {
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