window.addEventListener("load", solve);



function solve() {
    const taskAPI = 'http://localhost:3030/jsonstore/tasks/'

    const vacation = {
        inputFields: {
            name: document.querySelector('#name'),
            date: document.querySelector('#from-date'),
            days: document.querySelector('#num-days'),
        },
        addBtn: document.querySelector('#add-vacation'),
        editBtn: document.querySelector('#edit-vacation'),
        loadBtn: document.querySelector('#load-vacations'),
        list: document.querySelector('#list'),
        editData: [],
        id: null,
    }

    const bodyData = (id = '') => {
        const body = {
            name: vacation.inputFields.name.value,
            days: vacation.inputFields.days.value,
            date: vacation.inputFields.date.value,
        }
        if (id) body._id = id
        return body
    }

    const addBtnFunc = (e) => {
        e.preventDefault()
        fetch(taskAPI, {
            method: 'POST', body: JSON.stringify(bodyData())
        }).then(() => loadBtnFunc())
    }

    const editBtnFunc = (e) => {
        e.preventDefault()
        fetch(`${taskAPI}${vacation.id}`, {
            method: 'PUT', body: JSON.stringify(bodyData(vacation.id))
        }).then(() => {
            loadBtnFunc()
            vacation.addBtn.disabled = false
            vacation.editBtn.disabled = true
        })
    }

    const changeBtnFunc = (e) => {
        const currentElement = e.target.parentNode
        vacation.editData = [...currentElement.querySelectorAll('.container h2, .container h3')].map(x => x.textContent)
        vacation.id = e.target.id
        Object.values(vacation.inputFields).forEach((x, i) => x.value = vacation.editData[i])
        vacation.addBtn.disabled = true
        vacation.editBtn.disabled = false
        vacation.list.removeChild(currentElement)
    }

    const doneBtnFunc = (e) => {
        console.log(e.target.id)
        fetch(`${taskAPI}${e.target.id}`, {
            method: 'DELETE'
        }).then(() => loadBtnFunc())
    }

    const loadBtnFunc = () => {
        Object.values(vacation.inputFields).forEach(x => x.value = '')
        vacation.list.innerHTML = ''
        fetch(taskAPI).then(x => x.json())
            .then(o => {
                Object.values(o).forEach(x => {
                    vacation.list.innerHTML += `
                    <div class="container">
                        <h2>${x.name}</h2>
                        <h3>${x.date}</h3>
                        <h3>${x.days}</h3>
                        <button class="change-btn" id="${x._id}">Change</button>
                        <button class="done-btn" id="${x._id}">Done</button>
                    </div>`
                })
            }).then(() => {
            [...vacation.list.querySelectorAll('button')].forEach((x, i) => x.addEventListener('click', i % 2 === 0 ? changeBtnFunc : doneBtnFunc))
        })
    }

    vacation.addBtn.addEventListener('click', addBtnFunc)
    vacation.editBtn.addEventListener('click', editBtnFunc)
    vacation.loadBtn.addEventListener('click', loadBtnFunc)
}

















// function solve() {
//     const taskAPI = 'http://localhost:3030/jsonstore/tasks/'
//
//     const vacation = {
//         'addBtn': document.querySelector('#add-vacation'),
//         'editBtn': document.querySelector('#edit-vacation'),
//         'loadBtn': document.querySelector('#load-vacations'),
//         'list': document.querySelector('#list'),
//         'inputFields': {
//             name: document.querySelector('#name'),
//             date: document.querySelector('#from-date'),
//             days: document.querySelector('#num-days'),
//         },
//         'editData': [],
//         id: null
//     }
//
//     const resetInputFields = (input) => input.forEach(x => x.value = '')
//
//     const addBtnFunc = (e) => {
//         e.preventDefault()
//         fetch(taskAPI, {
//             method: 'POST',
//             body: JSON.stringify({
//                 name: vacation.inputFields.name.value,
//                 date: vacation.inputFields.date.value,
//                 days: vacation.inputFields.days.value,
//             })
//         })
//             .then(() => {
//                 loadBtnFunc()
//                 resetInputFields(Object.values(vacation.inputFields))
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }
//
//     const editBtnFunc = (e) => {
//         e.preventDefault()
//         fetch(`${taskAPI}${vacation.id}`, {
//             method: 'PUT',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 name: vacation.inputFields.name.value,
//                 days: vacation.inputFields.days.value,
//                 date: vacation.inputFields.date.value,
//                 _id: vacation.id
//             })
//         })
//             .then(() => {
//                 loadBtnFunc()
//                 resetInputFields(Object.values(vacation.inputFields))
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//         vacation.addBtn.disabled = false
//         vacation.editBtn.disabled = true
//         vacation.editData = []
//     }
//
//
//     const changeBtnFunc = (e) => {
//         vacation.editData = []
//         const currentElement = e.target.parentNode
//         vacation.id = e.target.id
//         vacation.editData = [...currentElement.querySelectorAll('.container h2, .container h3')].map(x => x.textContent)
//         console.log(vacation.editData)
//         vacation.list.removeChild(currentElement)
//         vacation.addBtn.disabled = true
//         vacation.editBtn.disabled = false
//         Object.values(vacation.inputFields).forEach((x, i) => x.value = vacation.editData[i])
//
//     }
//
//     const doneBtnFunc = (e) => {
//         console.log(e.target.id)
//         fetch(`${taskAPI}${e.target.id}`, {
//             method: 'DELETE'
//         })
//             .then(() => loadBtnFunc())
//             .catch(err => {
//                 console.log(err)
//             })
//     }
//
//
//     const loadBtnFunc = () => {
//         vacation.list.innerHTML = ''
//
//         fetch(taskAPI)
//             .then(x => x.json())
//             .then(o => {
//                 Object.values(o).forEach(x => {
//                     vacation.list.innerHTML += `
//                     <div class="container">
//                         <h2>${x.name}</h2>
//                         <h3>${x.date}</h3>
//                         <h3>${x.days}</h3>
//                         <button class="change-btn" id="${x._id}">Change</button>
//                         <button class="done-btn" id="${x._id}">Done</button>
//                     </div>`
//                 })
//             })
//             .then(() => [...vacation.list.querySelectorAll('button')].forEach((x, i) => x.addEventListener('click', i % 2 === 0 ? changeBtnFunc : doneBtnFunc)))
//             .catch(err => {
//                 console.log(err)
//             })
//     }
//
//
//     vacation.loadBtn.addEventListener('click', loadBtnFunc)
//     vacation.addBtn.addEventListener('click', addBtnFunc)
//     vacation.editBtn.addEventListener('click', editBtnFunc)
//
// }