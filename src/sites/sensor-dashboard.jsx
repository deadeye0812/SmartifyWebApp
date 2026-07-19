import SensorDashboardHeader from '../components/SensorStation/SensorHeader';
import TemperatureCard from '../components/SensorStation/TemperatureCard';
import HumidityCard from '../components/SensorStation/HumidityCard';
import RadarCard from '../components/SensorStation/RadarCard';

// ---------------------------------------------------------------------------
// Sensor Station — live dashboard for a DHT-style temp/humidity sensor and a
// PIR motion detector.
//
// This component SIMULATES sensor data locally so it works standalone. To
// wire it to a real device, replace the `pollSensors()` function below with
// a fetch() call to your device's API / MQTT bridge, e.g.:
//
//   async function pollSensors() {
//     const res = await fetch('/api/sensors/latest');
//     return await res.json(); // { temperature, humidity, motion }
//   }
//
// and call `applyReading(data)` with the result on an interval.
// ---------------------------------------------------------------------------


export default function SensorDashboard() {
  return (
    <div className="ss-root">
      <SensorDashboardHeader/>

      <div className="ss-grid">
        <TemperatureCard/>
        <HumidityCard/>
      </div>

      <RadarCard/>
    </div>
  );
}
