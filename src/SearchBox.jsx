
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function SearchBox({updateInfo}) {

    //& "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

    let [city, setCity] = useState("");
    let[error , setError] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "a6ea0159ac00cee761b0c876bdd2f141";

    let getWeatherInfo = async () => {
        try {
            let res = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);//&units=metric convert unit in readable format
            let jsonRes = await res.json();
            console.log(jsonRes);
    
            let result = {
                city:city,
                temp: jsonRes.main.temp,
                tempMin: jsonRes.main.temp_min,
                tempMax: jsonRes.main.temp_max,
                humidity: jsonRes.main.humidity,
                feelsLike: jsonRes.main.feels_like,
                weather: jsonRes.weather[0].description
            }
    
            console.log(result);
            return result;
            
        } catch (error) {
            throw error;
        }
    }

    let handleChange = (e) => {
        setCity(e.target.value);
    }

    let handleSubmit = async(e) => {
        try {
            e.preventDefault();
            console.log(city);
            setCity("");
            let newInfo =await getWeatherInfo();
            updateInfo(newInfo);
            
        } catch (error) {
            setError(true);
        }
    }

    return (
        <div className='SearchBox'>
            {/* <h3>Search For The Weather</h3> */}
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="City Name" variant="outlined" value={city} onChange={handleChange} style={{border:"1px solid black" , borderRadius:"5px"}} required />
                <br /><br />
                <Button variant="contained" type='submit'>Search</Button>
                {error && <p style={{color:"red"}}>City Not found</p>}
            </form>
        </div>
    )
}

export default SearchBox
