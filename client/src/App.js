import './App.css';
import GeoLocationDetails from './components/admin/geoLocationDetails';
import USPopulationChart from './components/admin/charts/usPopulation';
import ExchangeRatesChart from './components/admin/charts/exchangeRates';

function App() {
  return (
    <>
      <div class="col-left">
        <ExchangeRatesChart />
      </div>
      <div class="col-right">
        <USPopulationChart />
      </div>

      <div class="clear"></div>

      <div class="col-geo-location">
        <GeoLocationDetails />
      </div>
    </>
  );
}

export default App;
