import {useState} from 'react';

export function formatClock(d) {
  return d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function useSensorHeaderInformation() {
    const [connected, setConnected] = useState(true);
    const [now, setNow] = useState(new Date());

    return {connected, now};
}