import SensorDashboardHeader from '../components/SensorStation/SensorHeaderComponent/SensorHeader';
import TemperatureCard from '../components/SensorStation/TemperatureComponent/TemperatureCard';
import HumidityCard from '../components/SensorStation/HumidityComponent/HumidityCard';
import RadarCard from '../components/SensorStation/RadarComponent/RadarCard';

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
