import { useState } from 'react';
import axios from 'axios';

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=2b3598232807dab59bc74779e3e23b1b&units=metric`;

  const searchLocation = (KeyboardEvent) => {
    if (KeyboardEvent.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={KeyboardEvent => setLocation(KeyboardEvent.target.value)}
          placeholder='Enter Location'
          onKeyUp={searchLocation}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
           <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels like</p>
              </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}°C</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()}MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }

      </div>
    </div>
  );
}

export default App
