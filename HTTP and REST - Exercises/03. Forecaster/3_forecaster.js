async function attachEvents() {
    const submitBtn = document.getElementById('submit');
    const location = document.getElementById('location');
    const currentData = document.getElementById('current');
    const upcomingData = document.getElementById('upcoming');
    const BASE_URL = 'http://localhost:3030/jsonstore/forecaster/locations/';
    const CURRENT_CONDITIONS_URL = 'http://localhost:3030/jsonstore/forecaster/today/';
    const UPCOMING_URL = 'http://localhost:3030/jsonstore/forecaster/upcoming/';

    let locationName = null;
    let locationCode = null;

    const weatherSymbols = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        'Degrees': '&#176',
    };

    submitBtn.addEventListener('click', async () => {
        const searchedLocation = location.value;

        try {
            const response = await fetch(`${BASE_URL}`);
            const data = await response.json();
            for (const {code, name} of data) {
                if (name === searchedLocation) {
                    locationCode = code;
                    locationName = name;
                }
            }

            if (locationName !== null) {
                try {
                    currentData.parentElement.style.display = 'block';
                    const currentWeather = await fetch(`${CURRENT_CONDITIONS_URL}${locationCode}`);
                    const currentDataWeather = await currentWeather.json();
                    const weatherIconCode = currentDataWeather.forecast.condition;
                    const iconCode = weatherSymbols[weatherIconCode];
                    currentData.innerHTML = `
                        <div class="forecasts">
                            <span class="condition symbol">${iconCode}</span>
                            <span class="condition">
                                <span class="forecast-data">${currentDataWeather.name}</span>
                                <span class="forecast-data">${currentDataWeather.forecast.low}&#176/${currentDataWeather.forecast.high}&#176</span>
                                <span class="forecast-data">${weatherIconCode}</span>
                            </span>
                        </div>
                        `;

                    const upcomingWeather = await fetch(`${UPCOMING_URL}${locationCode}`);
                    const upcomingDataWeather = await upcomingWeather.json();
                    const forecastInfoDiv = document.createElement('div');
                    forecastInfoDiv.classList.add('forecast-info');
                    for (const data of upcomingDataWeather.forecast) {
                        const weatherIcon = weatherSymbols[data.condition];
                        forecastInfoDiv.innerHTML += `
                            <span class="upcoming">
                                <span class="symbol">${weatherIcon}</span>
                                <span class="forecast-data">${data.low}&#176/${data.high}&#176</span>
                                <span class="forecast-data">${data.condition}</span>
                            </span>
                        `;
                        upcomingData.appendChild(forecastInfoDiv);
                    }
                } catch (e) {
                }
            }
        } catch (e) {}
    });
}
attachEvents();