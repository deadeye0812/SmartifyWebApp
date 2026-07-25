import {useState, useCallback, useEffect} from 'react';
import { Droplets } from 'lucide-react';
import { mqttService } from '../../../services/SensorAPICalls';
import { useHumidityInformation } from './HumidityLogic';

export default function HumidityCard() {
    const {hum, humMinMax, humPath} = useHumidityInformation();

    return (
        <div className="ss-card">
          <div className="ss-card-head">
            <span className="ss-label">
              <Droplets size={13} color="var(--cool)" strokeWidth={2} />
              Luftfeuchtigkeit
            </span>
          </div>
          <div className="ss-reading">
            <span className="ss-value ss-mono" style={{ color: 'var(--cool)' }}>
              {hum}
            </span>
            <span className="ss-unit ss-mono">%</span>
          </div>
          <svg className="ss-spark" viewBox="0 0 220 56" width="100%" height="56" preserveAspectRatio="none">
            <path d={humPath} fill="none" stroke="var(--cool)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="ss-minmax ss-mono">
            <span>MIN {humMinMax[0].toFixed(0)}%</span>
            <span>MAX {humMinMax[1].toFixed(0)}%</span>
          </div>
        </div>
    );
}