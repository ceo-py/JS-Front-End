window.addEventListener("load", solve);

function solve() {
    const weatherAPI = 'http://localhost:3030/jsonstore/tasks/'
    const weatherTracker = {
        inputFields: {
            location: document.querySelector('#location'),
            date: document.querySelector('#date'),
            temperature: document.querySelector('#temperature'),
        },
        addWeatherBtn: document.querySelector('#add-weather'),
        editWeatherBtn: document.querySelector('#edit-weather'),
        loadHistory: document.querySelector('#load-history'),
        list: document.querySelector('#list'),
        editData: [],
        id: null
    }

    const resetInputFields = (input) => input.forEach(x => x.value = '')
    const bodyJson = (id= '') => {
        const body = {
                location: weatherTracker.inputFields.location.value,
                temperature: weatherTracker.inputFields.temperature.value,
                date: weatherTracker.inputFields.date.value,
            }
            if (id) body._id = id
        return body
    }

    const addBtnFuc = () => {
        fetch(weatherAPI, {
            method: 'POST', body: JSON.stringify(bodyJson())
        })
        .then(() => loadBtnFuc())
        resetInputFields(Object.values(weatherTracker.inputFields))

    }

    const editBtnFuc = () => {
        fetch(`${weatherAPI}${weatherTracker.id}`, {
            method: 'PUT',
            body: JSON.stringify(bodyJson(weatherTracker.id))
        })
        .then(() => loadBtnFuc())

        weatherTracker.addWeatherBtn.disabled = false
        weatherTracker.editWeatherBtn.disabled = true
    }

    const changeBtnFuc = (e) => {
        weatherTracker.id = e.target.id
        console.log(weatherTracker.id)
        const currentContainer = e.target.parentNode.parentNode
        weatherTracker.editData = [...currentContainer.querySelectorAll('.container h2, .container h3')].map(x => x.textContent)
        weatherTracker.list.removeChild(currentContainer)
        Object.values(weatherTracker.inputFields).forEach((x, i) => x.value = weatherTracker.editData[i])
        weatherTracker.addWeatherBtn.disabled = true
        weatherTracker.editWeatherBtn.disabled = false
    }

    const deleteBtnFuc = (e) => {
        fetch(`${weatherAPI}${e.target.id}`, {
            method: 'DELETE'
        })
            .then(() => loadBtnFuc())
    }

    const loadBtnFuc = () => {
        weatherTracker.list.innerHTML = ''
        fetch(weatherAPI).then(x => x.json())
            .then(o => {
                Object.values(o).forEach(x => {
                    weatherTracker.list.innerHTML += `
                        <div class="container">
                            <h2>${x.location}</h2>
                            <h3>${x.date}</h3>
                            <h3 id="celsius">${x.temperature}</h3>
                            <div id="buttons-container">  
                                <button class="change-btn" id="${x._id}">Change</button>
                                <button class="delete-btn" id="${x._id}">Delete</button>
                            </div>
                        </div>
                    `
                })
            })
            .then(() => {
                [...weatherTracker.list.querySelectorAll('button')].forEach((x, i) => x.addEventListener('click', i % 2 === 0 ? changeBtnFuc : deleteBtnFuc))
                weatherTracker.addWeatherBtn.disabled = false
                weatherTracker.editWeatherBtn.disabled = true
            })
    }

    weatherTracker.addWeatherBtn.addEventListener('click', addBtnFuc)
    weatherTracker.editWeatherBtn.addEventListener('click', editBtnFuc)
    weatherTracker.loadHistory.addEventListener('click', loadBtnFuc)
}