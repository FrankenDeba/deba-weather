import { FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE, FETCH_WEATHER } from "../action/actionTypes"

const initialState = {
    data: {},
    isLoading: true,
    error: null,
    placeName: null
}

export const weatherReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_WEATHER:
            return {
                ...state,
                isLoading: true
            }

        case FETCH_WEATHER_SUCCESS:
            return {
                ...state,
                data: action.data,
                placeName: action.placeName,
                isLoading: false
            }

        case FETCH_WEATHER_FAILURE:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
            
        default:
            return state
    }
}