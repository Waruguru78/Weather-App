import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios is a promise-based HTTP client for making API requests.
import DateSelector from './DateSelector'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const WeatherForecastApp = () => {
    const [city, setCity] = useState(''); 
    const [selectedDate, setSelectedDate] = useState(''); 
    const [forecastData, setForecastData] = useState(null); 
    const [filteredForecast, setFilteredForecast] = useState([]); 
    const [error, setError] = useState(null); 

    // useEffect to fetch the weather forecast data from the OpenWeatherMap API when the city is updated.
    useEffect(() => {
        const fetchForecastData = async () => {
            try {
                // Making an API request to fetch 5-day weather forecast data for the specified city.
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=643d6c8f0049d7732aab38687b0f0807&units=metric`
                );
                setForecastData(response.data); // Store the fetched forecast data.
                setError(null); // Clear any previous errors.
            } catch (error) {
                // Set an error message if there's an issue with the API request.
                setError(
                    `Error fetching weather data. Please try again.`
                );
                setForecastData(null); // Reset forecast data on error.
            }
        };

        // Fetch the weather data only if a city is entered.
        if (city) {
            fetchForecastData();
        }
    }, [city]); // This effect runs whenever the 'city' state changes.

    // useEffect to filter the weather data based on the selected date.
    useEffect(() => {
        // If forecast data and a date are available, filter the forecast for that date.
        if (forecastData && selectedDate) {
            const filteredData = forecastData.list.filter(
                forecast => forecast.dt_txt.includes(selectedDate) // Check if the forecast date matches the selected date.
            );
            setFilteredForecast(filteredData); // Store the filtered data.
        }
    }, [forecastData, selectedDate]); // This effect runs whenever 'forecastData' or 'selectedDate' changes.

    // Handler to update the city when the user types in the input field.
    const handleCityChange = (e) => {
        setCity(e.target.value); // Update the 'city' state with the input value.
    };

    // Handler to update the selected date when the user selects a date from DateSelector.
    const handleDateChange = (date) => {
        setSelectedDate(date); // Update the 'selectedDate' state with the chosen date.
    };

    // Function to determine the background color based on the weather condition.
const getWeatherClass = (weatherCondition) => {
    switch (weatherCondition) {
        case 'Clear':
            return 'bg-primary';
        case 'Clouds':
            return 'bg-secondary';
        case 'Rain':
        case 'Drizzle':
        case 'Thunderstorm':
            return 'bg-info';
        case 'Snow':
            return 'bg-light';
        case 'Mist':
        case 'Fog':
            return 'bg-dark';
        default:
            return 'bg-warning';
    }
};

    return (
        <div className="weather-forecast-app container mt-4">
            <h1>Weather Forecast</h1>
            <center className="form-group">
                <label htmlFor="city" style={{ fontSize: '30px'}}>
                    Enter City:
                </label>
                <input type="text" className="form-control" style={{ height: '50px', fontSize: '20px' }}
                    id="city" value={city}
                    onChange={handleCityChange} /> {/* Input field for entering city name */}
            </center>
            <DateSelector onDateChange={handleDateChange}/> {/* DateSelector component for choosing a date */}
            {error && <p>{error}</p>} {/* Display error message if any */}
            {
                filteredForecast.length > 0 && (
                    <div className="row forecast-container">
                        {filteredForecast.map((forecast, index) => (
                            <div key={index} className="col-md-3">
                                <div className={`card mb-3 bg-primary ${getWeatherClass(forecast.weather[0].main)}`}>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Date: {forecast.dt_txt}
                                        </h5>
                                        <p className="card-text">
                                            Temperature:
                                            {forecast.main.temp} °C {/* Display the temperature */}
                                        </p>
                                        <p className="card-text">
                                            Weather:
                                            {forecast.weather[0].description} {/* Display the weather description */}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
};

export default WeatherForecastApp;