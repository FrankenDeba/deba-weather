import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { fetchWeather } from "../../action/actionCreators";
import "./Weather.css";
import Widget from "../Widget/Widget";
import Loader from "../Loader/Loader";

function Weather() {
  console.log("bal");
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [weatherDataDaily, setWeatherDataDaily] = useState();
  const [weatherDataHourly, setWeatherDataHourly] = useState();
  const [hourlyTemp, setHourlyTemp] = useState([]);
  const [hourlyTempLabels, setHourlyTempLabels] = useState([]);
  const weatherData = useSelector((state) => state.data);
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentWeatherInfo();
  }, [lat, long]);

  useEffect(() => {
    weatherDataHourly &&
      weatherDataHourly.length &&
      setHourlyTemp((prevState) => {
        let tempWeather = [];
        weatherDataHourly.map((weather) => {
          tempWeather.push(weather.temp);
          return tempWeather;
        });
        return [...tempWeather];
      });
    weatherDataHourly &&
      weatherDataHourly.length &&
      setHourlyTempLabels((prevState) => {
        let tempWeatherLabels = [];
        weatherDataHourly.map((weather) => {
          tempWeatherLabels.push(
            moment(new Date(weather.dt * 1000)).format("DD MMM YYYY h:mm a")
          );
          return tempWeatherLabels;
        });
        return [...tempWeatherLabels];
      });
  }, [weatherDataDaily, weatherDataHourly]);

  useEffect(() => {
    weatherData.daily &&
      weatherData.daily.length &&
      setWeatherDataDaily(weatherData.daily.slice(1, 3));
    weatherData.hourly &&
      weatherData.hourly.length &&
      setWeatherDataHourly(weatherData.hourly);
  }, [weatherData]);

  const getCurrentWeatherInfo = () => {
    window.navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude);
      setLong(pos.coords.longitude);
    });
    dispatch(fetchWeather(lat, long, "Your Location"));
  };

  let config = {
    tooltips: {
      mode: "label",
      callbacks: {
        label: function (tooltipItem, data) {
          let label =
            "Temperature " +
            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] +
            " °c";
          return label;
        },
      },
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Temperature(°c)",
          },
        },
      ],
    },
  };

  return (
    <div>
      {isLoading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <>
          <div className="widget">
            {weatherDataDaily &&
              weatherDataDaily.length &&
              weatherDataDaily.map((item, index) => (
                <Widget index={index} key={index} weather={item} />
              ))}
          </div>
          {weatherDataHourly && weatherDataHourly.length && (
            <div className="chart-container">
              <Line
                height={100}
                data={{
                  labels: hourlyTempLabels,
                  datasets: [
                    {
                      label: "Hourly temperature for next 48 hours(IST)",
                      data: hourlyTemp,
                      fill: false,
                      backgroundColor: "rgba(75,192,192,0.2)",
                      borderColor: "rgba(75,192,192,1)",
                    },
                  ],
                }}
                options={config}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Weather;
