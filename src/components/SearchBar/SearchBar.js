import React, {useState, useEffect } from 'react'
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import { useDispatch } from 'react-redux'
import { fetchWeather } from "../../action/actionCreators"
import "./SearchBar.css"
function SearchBar() {
    const [lat, setLat] = useState()
    const [long, setLong] = useState()
    const [placeName, setPlacename ] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchWeather(lat, long, placeName))
    },[lat, long])
    const suggestionSelect = (result, lt, lng, text) => {
        setLat(lt)
        setLong(lng)
        setPlacename(text)
      }

    const checkIfInputIsEmpty = () => {
        if(document.getElementsByClassName("react-mapbox-ac-input").value == "")
            document.getElementsByClassName("react-mapbox-ac-menu").style.display = "none"
        return
    }
    
    return (
        <div onChange = {checkIfInputIsEmpty}>
            <MapboxAutocomplete publicKey='pk.eyJ1IjoiZGViYTIwMTJkZHgiLCJhIjoiY2tsbDl1NWF2MTRzbzJxbm1ncWljYXNzOSJ9.F6wsFQDBFbbFITjO6ZfIQw'
                    inputClass='form-control search'
                    onSuggestionSelect={suggestionSelect}
                    resetSearch={false}/>
        </div>
    )
}

export default SearchBar
