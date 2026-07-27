import './styles/weather-outlook-styles.css';
import './styles/sensor-station-styles.css'
import SensorDashboard from './sites/SensorDashboard/sensor-dashboard';
import WeatherOutlook from './sites/WeatherDashboard/weather-outlook';

function App() {
  return (
    <div>
      <WeatherOutlook/>
      <SensorDashboard/>
    </div>
  );
}

export default App;
