import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { weatherReducer } from "./reducer"

export const store = createStore(weatherReducer, applyMiddleware(thunk))