// import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

function GeoLocationDetails() {

  const [geoLocation, setGeoLocation] = useState(null);
  const [ip, setIP] = useState(null);


  const geoLocationByIP = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    setIP(res.data.IPv4);

    const geoLocationDetails = await axios.get(`${process.env.REACT_APP_NOT_API_URL}/api/admin/geoLocationByIP/${res.data.IPv4}`);
    setGeoLocation(geoLocationDetails.data.data)
  }

  useEffect(() => {
    geoLocationByIP()
  }, [])

  return (
    <>
      {geoLocation && <div className="App">
        <p>Geo location details for your IP: <strong>{ip}</strong></p>
        <p><strong> Country:</strong> {geoLocation.country}</p>
        <p><strong>City:</strong> {geoLocation.city}</p>
        <p><strong>Region:</strong> {geoLocation.region}</p>
        <p><strong>Timezone:</strong> {geoLocation.timezone}</p>
      </div>}
    </>
  );
}

export default GeoLocationDetails;