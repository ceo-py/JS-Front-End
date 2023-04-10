function attachEvents() {
    const API_URL = 'http://localhost:3030/jsonstore/tasks/'
    const inputFields = {
        title: document.querySelector('#title'),
        description: document.querySelector('#description'),
    }

    const sprintApp = {
        toDo: document.querySelector('#todo-section ul'),
        inProgress: document.querySelector('#in-progress-section ul'),
        review: document.querySelector('#code-review-section ul'),
        done: document.querySelector('#done-section ul'),
        createBtn: document.querySelector('#create-task-btn'),
        loadBtn: document.querySelector('#load-board-btn'),
    }

    const board = {
        'ToDo': {
            html: sprintApp.toDo,
            btnText: 'Move to In Progress'
        },
        'In Progress': {
            html: sprintApp.inProgress,
            btnText: 'Move to Code Review'
        },
        'Code Review': {
            html: sprintApp.review,
            btnText: 'Move to Done'
        },
        'Done': {
            html: sprintApp.done,
            btnText: 'Close'
        },
    }

    const moveBtnStatus = {
        'Move to In Progress': 'In Progress',
        'Move to Code Review': 'Code Review',
        'Move to Done': 'Done',
    }

    const moveBtnFunctionality = async (even) => {

        const btnTextContent = even.currentTarget

        await apiRequest({
            url: `${API_URL}${btnTextContent.id}`,
            method: btnTextContent.textContent === 'Close' ? 'DELETE' : 'PATCH',
            item: {
                status: moveBtnStatus[btnTextContent.textContent]
            }
        })
        loadApiDataToHtml(await apiRequest({
            url: API_URL,
            method: 'GET'
        }))
    }

    const apiRequest = async ({url = '', method = '', id = '', item = ''}) => {
        const options = {
            method: method
        }
        if (['PATCH', 'POST'].includes(method)) {
            options.headers = {'Content-Type': 'application/json'}
            options.body = JSON.stringify(item)
        }
        const data = await fetch(`${url}${id}`, options)
        return await data.json()
    }
    

    const clearInputFields = (dataFromInput => dataFromInput.forEach(x => x.value = ''))


    const createBtnFunctionality = async (event) => {
        event.preventDefault()

        await apiRequest({
            url: API_URL,
            method: 'POST',
            item: {
                title: inputFields.title.value,
                description: inputFields.description.value,
                status: 'ToDo'
            }
        })
        clearInputFields(Object.values(inputFields))
        loadApiDataToHtml(await apiRequest({
            url: API_URL,
            method: 'GET'
        }))
    }

    const createHtmlTaskElement = (data) => {
        const li = document.createElement('li')
        li.classList.add('task');
        li.innerHTML =`
                        <h3>${data.title}</h3>
                        <p>${data.description}</p>
                        <button id="${data._id}">${board[data.status].btnText}</button>
                    `
        li.querySelector('button').addEventListener('click', moveBtnFunctionality)
        return li
    }

    const loadApiDataToHtml = (data) => {
        Object.values(board).forEach(x => x.html.innerHTML = '')
        Object.values(data).forEach(x => board[x.status].html.appendChild(createHtmlTaskElement(x)))
    }

    const loadBtnFunctionality = async (event) => {
        event.preventDefault()
        loadApiDataToHtml(await apiRequest({
            url: API_URL,
            method: 'GET'
        }))
    }

    sprintApp.createBtn.addEventListener('click', createBtnFunctionality)
    sprintApp.loadBtn.addEventListener('click', loadBtnFunctionality)

}



// no inner html
// function attachEvents() {
//     const API_URL = 'http://localhost:3030/jsonstore/tasks/'
//     const inputFields = {
//         title: document.querySelector('#title'),
//         description: document.querySelector('#description'),
//     }
//
//     const sprintApp = {
//         toDo: document.querySelector('#todo-section ul'),
//         inProgress: document.querySelector('#in-progress-section ul'),
//         review: document.querySelector('#code-review-section ul'),
//         done: document.querySelector('#done-section ul'),
//         createBtn: document.querySelector('#create-task-btn'),
//         loadBtn: document.querySelector('#load-board-btn'),
//     }
//
//     const board = {
//         'ToDo': {
//             html: sprintApp.toDo,
//             btnText: 'Move to In Progress'
//         },
//         'In Progress': {
//             html: sprintApp.inProgress,
//             btnText: 'Move to Code Review'
//         },
//         'Code Review': {
//             html: sprintApp.review,
//             btnText: 'Move to Done'
//         },
//         'Done': {
//             html: sprintApp.done,
//             btnText: 'Close'
//         },
//     }
//
//     const moveBtnStatus = {
//         'Move to In Progress': 'In Progress',
//         'Move to Code Review': 'Code Review',
//         'Move to Done': 'Done',
//     }
//
//     const moveBtnFunctionality = async (even) => {
//
//         const btnTextContent = even.currentTarget
//
//         await apiRequest({
//             url: `${API_URL}${btnTextContent.id}`,
//             method: btnTextContent.textContent === 'Close' ? 'DELETE' : 'PATCH',
//             item: {
//                 status: moveBtnStatus[btnTextContent.textContent]
//             }
//         })
//         loadApiDataToHtml(await apiRequest({
//             url: API_URL,
//             method: 'GET'
//         }))
//     }
//
//     const apiRequest = async ({url = '', method = '', id = '', item = ''}) => {
//         const options = {
//             method: method
//         }
//         if (['PATCH', 'POST'].includes(method)) {
//             options.headers = {'Content-Type': 'application/json'}
//             options.body = JSON.stringify(item)
//         }
//         const data = await fetch(`${url}${id}`, options)
//         return await data.json()
//     }
//
//
//     const createElement = ({
//                                tag,
//                                textContent = '',
//                                value = '',
//                                className = [],
//                                attributes = {},
//                                buttonEvent = {},
//                                parent = ''
//                            }) => {
//         const e = document.createElement(tag)
//         if (textContent) e.textContent = textContent
//         if (value) e.value = value
//         className.forEach(x => e.classList.add(x))
//         Object.entries(attributes).forEach(([key, value]) => e.setAttribute(key, value))
//         Object.entries(buttonEvent).forEach(([key, value]) => e.addEventListener(key, value))
//         if (parent) parent.appendChild(e)
//         return e
//     }
//
//     const clearInputFields = (dataFromInput => dataFromInput.forEach(x => x.value = ''))
//
//
//     const createBtnFunctionality = async (event) => {
//         event.preventDefault()
//
//         await apiRequest({
//             url: API_URL,
//             method: 'POST',
//             item: {
//                 title: inputFields.title.value,
//                 description: inputFields.description.value,
//                 status: 'ToDo'
//             }
//         })
//         clearInputFields(Object.values(inputFields))
//         loadApiDataToHtml(await apiRequest({
//             url: API_URL,
//             method: 'GET'
//         }))
//     }
//
//     const createHtmlTaskElement = (data) => {
//         const li = createElement({
//             tag: 'li',
//             className: ['task'],
//         })
//         createElement({
//             tag: 'h3',
//             textContent: data.title,
//             parent: li
//         })
//         createElement({
//             tag: 'p',
//             textContent: data.description,
//             parent: li
//         })
//         createElement({
//             tag: 'button',
//             textContent: board[data.status].btnText,
//             attributes: {id: data._id},
//             buttonEvent: {click: moveBtnFunctionality},
//             parent: li
//         })
//
//         return li
//
//     }
//
//     const loadApiDataToHtml = (data) => {
//         Object.values(board).forEach(x => x.html.innerHTML = '')
//         Object.values(data).forEach(x => board[x.status].html.appendChild(createHtmlTaskElement(x)))
//     }
//
//     const loadBtnFunctionality = async (event) => {
//         event.preventDefault()
//         loadApiDataToHtml(await apiRequest({
//             url: API_URL,
//             method: 'GET'
//         }))
//     }
//
//     sprintApp.createBtn.addEventListener('click', createBtnFunctionality)
//     sprintApp.loadBtn.addEventListener('click', loadBtnFunctionality)
//
// }

attachEvents();