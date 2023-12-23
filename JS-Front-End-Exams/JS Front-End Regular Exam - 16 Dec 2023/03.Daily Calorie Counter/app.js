window.addEventListener("load", solve);

function solve() {
    const API_URL = 'http://localhost:3030/jsonstore/tasks/'
    const dailyCalorieCounter = {
        inputFields: {
            food: document.querySelector('#food'),
            time: document.querySelector('#time'),
            calories: document.querySelector('#calories'),
        },
        form: document.querySelector('form'),
        loadMealBtn: document.querySelector('#load-meals'),
        editMealBtn: document.querySelector('#edit-meal'),
        addMealBtn: document.querySelector('#add-meal'),
        listMeals: document.querySelector('#list'),
        totalMeals: document.querySelector('h2'),
        id: null
    }
    const handlerChangeBtn = (e) => {
        dailyCalorieCounter.id = e.target.id
        const data = [...e.target.parentNode.parentNode.querySelectorAll('h2, h3')].map(x => x.textContent)
        Object.values(dailyCalorieCounter.inputFields).forEach((x, i) => x.value = data[i])
        dailyCalorieCounter.editMealBtn.disabled = false
        dailyCalorieCounter.addMealBtn.disabled = true
    }

    const handleLoadMealBtn = (e) => {
        dailyCalorieCounter.listMeals.innerHTML = ''
        fetch(API_URL).then(x => x.json()).then(o => {
            Object.values(o).forEach(x => dailyCalorieCounter.listMeals.innerHTML += `
            <div class="meal">
              <h2>${x.food}</h2>
              <h3>${x.time}</h3>
              <h3>${x.calories}</h3>
              <div id="meal-buttons">
                <button class="change-meal" id="${x._id}">Change</button>
                <button class="delete-meal" id="${x._id}">Delete</button>
              </div>
            </div>`)
            dailyCalorieCounter.totalMeals.textContent = `Today Meals: ${Object.keys(o).length}`

        }).then(() => [...dailyCalorieCounter.listMeals.querySelectorAll('button')].map((x, i) => x.addEventListener('click', i % 2 === 0 ? handlerChangeBtn : handlerDeleteBtn)))
            .then(() => dailyCalorieCounter.editMealBtn.disabled = true);
    }


    const handlerDeleteBtn = (e) => {
        const id = e.target.id
        fetch(`${API_URL}${id}`, {
            method: 'DELETE'
        }).then(() => handleLoadMealBtn())

    }

    const handleAddMealBtn = () => {
        fetch(API_URL, {
            method: 'POST', body: JSON.stringify({
                food: dailyCalorieCounter.inputFields.food.value,
                time: dailyCalorieCounter.inputFields.time.value,
                calories: dailyCalorieCounter.inputFields.calories.value,

            })
        }).then(() => {
            handleLoadMealBtn()
            dailyCalorieCounter.form.reset()
        })
    }

    const handleEditMealBtn = () => {
        console.log(dailyCalorieCounter.id)
        fetch(`${API_URL}${dailyCalorieCounter.id}`, {
            method: 'PUT', body: JSON.stringify({
                food: dailyCalorieCounter.inputFields.food.value,
                time: dailyCalorieCounter.inputFields.time.value,
                calories: dailyCalorieCounter.inputFields.calories.value,
                _id: dailyCalorieCounter.id
            })
        }).then(() => {
            dailyCalorieCounter.editMealBtn.disabled = true
            dailyCalorieCounter.addMealBtn.disabled = false
            handleLoadMealBtn()
            dailyCalorieCounter.form.reset()
        })
    }


    dailyCalorieCounter.loadMealBtn.addEventListener('click', handleLoadMealBtn)
    dailyCalorieCounter.addMealBtn.addEventListener('click', handleAddMealBtn)
    dailyCalorieCounter.editMealBtn.addEventListener('click', handleEditMealBtn)
}

