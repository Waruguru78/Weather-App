import React from 'react';
import WeatherComponent
    from './components/WeatherComponent';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    Real-time Weather Forecast App
                </h1>
            </header>
            <main>
                <WeatherComponent />
            </main>
            <footer>
                <p>
                    © 2024 Weather App.
                </p>
            </footer>
        </div>
    );
}

export default App;