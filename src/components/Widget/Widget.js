import React from 'react'
import { useSelector } from "react-redux"
import moment from "moment"
import "./Widget.css"
function Widget(props) {
    const { temp, dt ,feels_like, humidity, wind_speed, pressure, sunrise, sunset ,weather } = props.weather
    const { index } = props
    const placeName = useSelector(state => state.placeName)

    return (
        <div className = "widget-container">
            <div className = "weather-header">
            <div>{index === 0 ? "Tomorrow" : "Day after tomorrow" } - {moment(new Date(dt * 1000)).format("DD MMM YYYY")} ({placeName})</div>
                <div><div><img src = {`http://openweathermap.org/img/wn/${weather[0].icon}.png`} alt = "icon"></img></div><span>{weather[0].description}</span></div>
            </div>
            
            <div className = "stats">
                <div className = "temperature-holder">
                    <span className = "temperature-holder-item">Temperature(day): {temp.day} °c</span>
                    <span className = "temperature-holder-item">Temperature(night): {temp.night} °c</span>
                    <span className = "temperature-holder-item">Temperature(min): {temp.min} °c</span>
                    <span className = "temperature-holder-item">Temperature(max): {temp.max} °c</span>
                </div>

                <div className = "temperature-holder">
                    <span className = "temperature-holder-item">Feels Like(day): {feels_like.day} °c</span>
                    <span className = "temperature-holder-item">Feels Like(night): {feels_like.night} °c</span>
                </div>

                <div className = "temperature-holder">
                    <span className = "temperature-holder-item">Humidity: {humidity} %</span>
                    <span className = "temperature-holder-item">Wind speed: {wind_speed} km/h</span>
                    <span className = "temperature-holder-item">Pressure: {pressure}</span>
                </div>

                <div className = "temperature-holder">
                    <span className = "temperature-holder-item">Sunrise: {moment(new Date(sunrise * 1000)).format("h:mm a")}</span>
                    <span className = "temperature-holder-item">Sunset: {moment(new Date(sunset * 1000)).format("h:mm a")}</span>
                </div>
            </div>  
        </div>
    )
}

export default Widget
