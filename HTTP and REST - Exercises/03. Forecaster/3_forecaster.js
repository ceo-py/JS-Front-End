function attachEvents() {
    const [inputField, weatherBtn] = document.querySelectorAll('input')
    const forecast = document.querySelector('#forecast')
    const current = document.querySelector('#current')
    const upcoming = document.querySelector('#upcoming')

    const APILocation = 'http://localhost:3030/jsonstore/forecaster/locations'
    const APIToday = 'http://localhost:3030/jsonstore/forecaster/today/'
    const APIUpcoming = 'http://localhost:3030/jsonstore/forecaster/upcoming/'

    const weatherIcons = {
        'Sunny': '&#x2600', // ☀
        'Partly sunny': '&#x26C5', // ⛅
        'Overcast': '&#x2601', // ☁
        'Rain': '&#x2614', // ☂
        'Degrees': '&#176',   // °

    }

    function findLocation(l, locations) {
        return locations.filter(x => x.name === l)
    }

    function errorMsg() {

        current.innerHTML = `
                <div class="label">Current conditions</div>
                <div class="forecasts">
                    <span class="condition symbol"></span> 
                    <span class="condition">
                        <span class="forecast-data">Error</span>
                    </span>
                </div>`
        upcoming.innerHTML = `<div id="upcoming">
                <div class="label">Three-day forecast</div>
            </div>`
    }

    function currentCondition(today) {
        current.innerHTML = `
                <div class="label">Current conditions</div>
                <div class="forecasts">
                    <span class="condition symbol">${weatherIcons[today.forecast.condition]}</span> 
                    <span class="condition">
                        <span class="forecast-data">${today.name}</span>
                        <span class="forecast-data">${today.forecast.low}°/${today.forecast.high}°</span>
                        <span class="forecast-data">${today.forecast.condition}</span>
                    </span>
                </div>`
    }

    function upcomingWeather(upcomingData) {
        upcoming.innerHTML =
            `
            <div class="label">Three-day forecast</div>
            <div class="forecast-info">
            <span class="upcoming">
            <span class="symbol">${weatherIcons[upcomingData.forecast[0].condition]}</span>
            <span class="forecast-data">${upcomingData.forecast[0].low}°/${upcomingData.forecast[0].high}°</span>
            <span class="forecast-data">${upcomingData.forecast[0].condition}</span>
            </span>
            
            <span class="upcoming">
            <span class="symbol">${weatherIcons[upcomingData.forecast[1].condition]}</span>
            <span class="forecast-data">${upcomingData.forecast[1].low}°/${upcomingData.forecast[1].high}°</span>
            <span class="forecast-data">${upcomingData.forecast[1].condition}</span>
            </span>
            
            <span class="upcoming">
            <span class="symbol">${weatherIcons[upcomingData.forecast[2].condition]}</span>
             <span class="forecast-data">${upcomingData.forecast[2].low}°/${upcomingData.forecast[2].high}°</span>
            <span class="forecast-data">${upcomingData.forecast[2].condition}</span>
            </span>
        </div>`

    }

    async function getWeather() {
        try {
            forecast.style.display = 'block'
            const response = await fetch(APILocation)
            const locations = await response.json()
            const location = findLocation(inputField.value, locations)[0]
            if (location.length === 0) {
                errorMsg()
                return
            }
            const responseToday = await fetch(`${APIToday}${location.code}`)
            const todayData = await responseToday.json()

            const responseUpcoming = await fetch(`${APIUpcoming}${location.code}`)
            const upcomingData = await responseUpcoming.json()


            currentCondition(todayData)
            upcomingWeather(upcomingData)

        } catch (err) {
            errorMsg()
        }


    }

    weatherBtn.addEventListener('click', getWeather)
}

attachEvents();


// <div className="forecast-info">
// <span className="upcoming">
// <span className="symbol"></span>
// <span className="forecast-data">6°/17°</span>
// <span className="forecast-data">Partly sunny</span>
// </span>












// async function attachEvents() {
//     const submitBtn = document.getElementById('submit');
//     const location = document.getElementById('location');
//     const currentData = document.getElementById('current');
//     const upcomingData = document.getElementById('upcoming');
//     const BASE_URL = 'http://localhost:3030/jsonstore/forecaster/locations/';
//     const CURRENT_CONDITIONS_URL = 'http://localhost:3030/jsonstore/forecaster/today/';
//     const UPCOMING_URL = 'http://localhost:3030/jsonstore/forecaster/upcoming/';
//
//     let locationName = null;
//     let locationCode = null;
//
//     const weatherSymbols = {
//         'Sunny': '&#x2600',
//         'Partly sunny': '&#x26C5',
//         'Overcast': '&#x2601',
//         'Rain': '&#x2614',
//         'Degrees': '&#176',
//     };
//
//     submitBtn.addEventListener('click', async () => {
//         const searchedLocation = location.value;
//
//         try {
//             const response = await fetch(`${BASE_URL}`);
//             const data = await response.json();
//             for (const {code, name} of data) {
//                 if (name === searchedLocation) {
//                     locationCode = code;
//                     locationName = name;
//                 }
//             }
//
//             if (locationName !== null) {
//                 try {
//                     currentData.parentElement.style.display = 'block';
//                     const currentWeather = await fetch(`${CURRENT_CONDITIONS_URL}${locationCode}`);
//                     const currentDataWeather = await currentWeather.json();
//                     const weatherIconCode = currentDataWeather.forecast.condition;
//                     const iconCode = weatherSymbols[weatherIconCode];
//                     currentData.innerHTML = `
//                         <div class="forecasts">
//                             <span class="condition symbol">${iconCode}</span>
//                             <span class="condition">
//                                 <span class="forecast-data">${currentDataWeather.name}</span>
//                                 <span class="forecast-data">${currentDataWeather.forecast.low}&#176/${currentDataWeather.forecast.high}&#176</span>
//                                 <span class="forecast-data">${weatherIconCode}</span>
//                             </span>
//                         </div>
//                         `;
//
//                     const upcomingWeather = await fetch(`${UPCOMING_URL}${locationCode}`);
//                     const upcomingDataWeather = await upcomingWeather.json();
//                     const forecastInfoDiv = document.createElement('div');
//                     forecastInfoDiv.classList.add('forecast-info');
//                     for (const data of upcomingDataWeather.forecast) {
//                         const weatherIcon = weatherSymbols[data.condition];
//                         forecastInfoDiv.innerHTML += `
//                             <span class="upcoming">
//                                 <span class="symbol">${weatherIcon}</span>
//                                 <span class="forecast-data">${data.low}&#176/${data.high}&#176</span>
//                                 <span class="forecast-data">${data.condition}</span>
//                             </span>
//                         `;
//                         upcomingData.appendChild(forecastInfoDiv);
//                     }
//                 } catch (e) {
//                 }
//             }
//         } catch (e) {}
//     });
// }
// attachEvents();






// function attachEvents() {
//     const [inputField, weatherBtn] = document.querySelectorAll('input')
//     const forecast = document.querySelector('#forecast')
//     const current = document.querySelector('#current')
//     const upcoming = document.querySelector('#upcoming')
//
//     const APILocation = 'http://localhost:3030/jsonstore/forecaster/locations'
//     const APIToday = 'http://localhost:3030/jsonstore/forecaster/today/'
//     const APIUpcoming = 'http://localhost:3030/jsonstore/forecaster/upcoming/'
//
//     const weatherIcons = {
//         'Sunny': '&#x2600', // ☀
//         'Partly sunny': '&#x26C5', // ⛅
//         'Overcast': '&#x2601', // ☁
//         'Rain': '&#x2614', // ☂
//         'Degrees': '&#176',   // °
//
//     }
//
//     function findLocation(l, locations) {
//         return locations.filter(x => x.name === l)
//     }
//
//     function errorMsg() {
//
//         current.innerHTML = `
//                 <div class="label">Current conditions</div>
//                 <div class="forecasts">
//                     <span class="condition symbol"></span>
//                     <span class="condition">
//                         <span class="forecast-data">Error</span>
//                     </span>
//                 </div>`
//         upcoming.innerHTML = ``
//     }
//
//     function currentCondition(today) {
//         current.innerHTML = `
//                 <div class="label">Current conditions</div>
//                 <div class="forecasts">
//                     <span class="condition symbol">${weatherIcons[today.forecast.condition]}</span>
//                     <span class="condition">
//                         <span class="forecast-data">${today.name}</span>
//                         <span class="forecast-data">${today.forecast.low}°/${today.forecast.high}°</span>
//                         <span class="forecast-data">${today.forecast.condition}</span>
//                     </span>
//                 </div>`
//     }
//
//     function upcomingWeather(upcomingData) {
//         upcoming.innerHTML =
//             `
//             <div class="label">Three-day forecast</div>
//             <div class="forecast-info">
//             <span class="upcoming">
//             <span class="symbol">${weatherIcons[upcomingData.forecast[0].condition]}</span>
//             <span class="forecast-data">${upcomingData.forecast[0].low}°/${upcomingData.forecast[0].high}°</span>
//             <span class="forecast-data">${upcomingData.forecast[0].condition}</span>
//             </span>
//
//             <span class="upcoming">
//             <span class="symbol">${weatherIcons[upcomingData.forecast[1].condition]}</span>
//             <span class="forecast-data">${upcomingData.forecast[1].low}°/${upcomingData.forecast[1].high}°</span>
//             <span class="forecast-data">${upcomingData.forecast[1].condition}</span>
//             </span>
//
//             <span class="upcoming">
//             <span class="symbol">${weatherIcons[upcomingData.forecast[2].condition]}</span>
//              <span class="forecast-data">${upcomingData.forecast[2].low}°/${upcomingData.forecast[2].high}°</span>
//             <span class="forecast-data">${upcomingData.forecast[2].condition}</span>
//             </span>
//         </div>`
//
//     }
//
//     async function getWeather() {
//         try {
//             forecast.style.display = 'block'
//             const response = await fetch(APILocation)
//             const locations = await response.json()
//             const location = findLocation(inputField.value, locations)[0]
//             if (location.length === 0) {
//                 errorMsg()
//                 return
//             }
//             const responseToday = await fetch(`${APIToday}${location.code}`)
//             const todayData = await responseToday.json()
//
//             const responseUpcoming = await fetch(`${APIUpcoming}${location.code}`)
//             const upcomingData = await responseUpcoming.json()
//
//
//             currentCondition(todayData)
//             upcomingWeather(upcomingData)
//
//         } catch (err) {
//             errorMsg()
//         }
//
//
//     }
//
//     weatherBtn.addEventListener('click', getWeather)
// }
//
// attachEvents();
