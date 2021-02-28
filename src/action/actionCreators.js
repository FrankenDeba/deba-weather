import axios from "axios"
import { FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE, FETCH_WEATHER} from "./actionTypes"
const API_KEY = "06c47f02b50c65099fadafb6c6f61a67"

export const fetchWeather = (lat, long, placeName) => {
    return function(dispatch){
        dispatch(loadWeather())
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,alerts&units=metric&appid=${API_KEY}`)
        .then(res => {
            dispatch(fetchWeatherSuccess({data: res.data, placeName}))
        })
        .catch(error => {
            dispatch(fetchWeatherFailure(error))
        })
    }
}

const loadWeather = () => {
    return {
        type: FETCH_WEATHER
    }
}

const fetchWeatherSuccess = (data) => {
    return {
        type: FETCH_WEATHER_SUCCESS,
        data: data.data,
        placeName: data.placeName
    }
}

const fetchWeatherFailure = (error) => {
    return {
        type: FETCH_WEATHER_FAILURE,
        error
    }
}