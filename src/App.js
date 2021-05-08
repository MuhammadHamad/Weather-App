import React, { useEffect, useState, useRef } from "react";
// import { Counter } from "./features/counter/Counter";
import "./App.css";
import axios from "axios";
import moment from "moment";

function App() {
  const [weatherInfo, setWeatherInfo] = useState("");
  const [image, setImage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    fetchWeatherInfo();
  }, []);

  const fetchWeatherInfo = (e) => {
    e?.preventDefault();

    const options = {
      method: "GET",
      url: "https://community-open-weather-map.p.rapidapi.com/weather",
      params: {
        q: inputRef.current.value || "London, uk",
        units: "metric",
      },
      headers: {
        "x-rapidapi-key": "a2f175b37cmsh88c4a643f920789p18f72cjsna947c968a6c0",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setWeatherInfo(response.data);

        //Clear the input after data fetch
        inputRef.current.value = "";
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    determineBackgroundImage();
  }, [weatherInfo]);

  const determineBackgroundImage = () => {
    if (weatherInfo?.main?.temp > 10) {
      setImage(
        "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHdlYXRoZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
      );
      if (weatherInfo?.main?.temp < 10) {
        setImage(
          "https://images.unsplash.com/photo-1422207134147-65fb81f59e38?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29sZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
        );
      }
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${image})` }}>
      <div className="app__container">
        <div className="app__info app__left">
          <h1 className="app__header">Weather App</h1>
          <form>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type the city name"
            />
            <button type="submit" onClick={fetchWeatherInfo}>
              Show me the weather
            </button>
          </form>
        </div>

        <div className="app__info app__right">
          <h2>{weatherInfo.name}</h2>
          <h2>{weatherInfo.main?.temp} Degrees Celsius</h2>
          <h3>
            {weatherInfo &&
              `Sunrise: ${moment
                .unix(weatherInfo.sys?.sunrise)
                .format("LLLL")}`}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default App;
