function attachEvents() {
    const [location, submit] = Array.from(document.querySelectorAll('input'))
    const current = document.querySelector('#current')
    const upcoming = document.querySelector('#upcoming')
    const forecast = document.querySelector('#forecast')
    let correctWeather = false
    const correctLocations = 'http://localhost:3030/jsonstore/forecaster/locations'
    const todayWeatherAPI = 'http://localhost:3030/jsonstore/forecaster/today/'
    const threeDayWeatherAPI = 'http://localhost:3030/jsonstore/forecaster/upcoming/'

    const weatherIcons = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
    }


    function checkCorrectInputWeather(location) {
        fetch(correctLocations).then(x => x.json()).then(x => {
            x.forEach(e => {
                if (e.name === location) {
                    correctWeather = true
                    fetch(`${todayWeatherAPI}${e.code}`).then(x => x.json()).then(x => {
                        todayWeather(x)
                    }).catch(() => {
                        forecast.style.display = 'block'
                        const p = document.createElement('p')
                        p.textContent = 'Error'
                        current.appendChild(p)
                    })
                    fetch(`${threeDayWeatherAPI}${e.code}`).then(x => x.json()).then(x => {
                        threeDayWeather(x)
                    }).catch()
                }
            })
        }).then(x => correctWeather === true ? '' : errorMsg()).catch()
    }


    function checkErrorDisplay(error) {
        if (error) {
            current.removeChild(error)
        }
    }

    function errorMsg() {
        const p = document.createElement('p')
        p.textContent = 'Error'
        forecast.style.display = 'block'
        current.appendChild(p)
    }


    function createElementWithClassName(tag, className) {
        const e = document.createElement(tag)
        className.forEach(x => {
            e.classList.add(x)
        })
        return e
    }

    function addTextContentToElementWithClass(tag, className, textContent) {
        const e = createElementWithClassName(tag, className)
        e.textContent = textContent
        return e
    }

    function todayWeather(e) {
        const div = createElementWithClassName('div', ['forecasts'])
        const weatherType = weatherIcons[e.forecast.condition]

        div.appendChild(addTextContentToElementWithClass('span', ['condition', 'symbol'], weatherType))

        const span = createElementWithClassName('span', ['condition'])
        span.appendChild(addTextContentToElementWithClass('span', ['forecast-data'], e.name))
        span.appendChild(addTextContentToElementWithClass('span', ['forecast-data'], `${e.forecast.low}°/${e.forecast.high}°`))
        span.appendChild(addTextContentToElementWithClass('span', ['forecast-data'], e.forecast.condition))

        div.appendChild(span)

        current.appendChild(div)
        forecast.style.display = 'block;'

    }

    function threeDayWeather(e) {
        const div = createElementWithClassName('div', ['forecast-into'])
        const span = createElementWithClassName('span', ['upcoming'])
        e.forecast.forEach(x => {
            span.appendChild(addTextContentToElementWithClass('span', ['symbol'], weatherIcons[x.condition]))
            span.appendChild(addTextContentToElementWithClass('span', ['forecast-data'], `${x.low}°/${x.high}°`))
            span.appendChild(addTextContentToElementWithClass('span', ['forecast-data'], x.condition))
        })
        div.appendChild(span)
        upcoming.appendChild(div)
    }

    function deleteOldResult(e) {
        if (e) {
            current.removeChild(e)
            upcoming.removeChild(document.querySelector('.forecast-into'))
        }

    }

    submit.addEventListener('click', () => {
        forecast.style.display = 'none'
        checkErrorDisplay(document.querySelector('#current > p'))
        deleteOldResult(document.querySelector('.forecasts'))
        checkCorrectInputWeather(location.value)
    })
}

attachEvents();
