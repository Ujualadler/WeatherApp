import { useEffect, useState } from "react";
import { Weather } from './Components/Weather';
import { Dimmer, Loader } from 'semantic-ui-react'
import './App.css'
import { LocationInput } from "./Components/LocationInput";

export default function App() {

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [data, setData] = useState({});

  const apiUrl= import.meta.env.VITE_REACT_APP_API_URL;
  const apiKey= import.meta.env.VITE_REACT_APP_API_KEY;

  useEffect(() => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    fetchData();
  }, [])

  let fetchData = async ()=>{   
    await fetch(`${apiUrl}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${apiKey}`)
    .then(res=>res.json())
      .then(result => {
        setData(result)
      });
  }

  return (
    <>
    <div  className="App">
      {(typeof data?.main != 'undefined') ? (
        <Weather weatherData={data} />
      ) : (
        <div>
        <Dimmer active>
          <Loader>Loading..</Loader>
        </Dimmer>
     </div>
      )}
   <div style={{display:'flex',justifyContent:'center'}}>
    <LocationInput fetchData={fetchData} setLat={setLat} setLong={setLong}/>
    </div>
    </div>
    </>
  );
}