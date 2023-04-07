function attachEvents() {
    const API_URL = 'http://localhost:3030/jsonstore/tasks/'
    const toDoList = {
        text: document.querySelector('#title'),
        addButton: document.querySelector('#add-button'),
        loadButton: document.querySelector('#load-button'),
        result: document.querySelector('#todo-list'),
    }


    const createElement = ({tag, textContent = '', value = '', className = [], attributes = {}, buttonEven = {}}) => {
        const e = document.createElement(tag)
        if (textContent) e.textContent = textContent
        if (value) e.value = value
        className.forEach(x => e.classList.add(x))
        for (const [key, value] of Object.entries(attributes)) {
            e.setAttribute(key, value)
        }
        for (const [key, value] of Object.entries(buttonEven)) {
            e.addEventListener(key, value)
        }
        return e
    }


    const loadDataFromApi = async (API_URL) => {
        const data = await fetch(API_URL)
        return await data.json()
    }

    const addItemApi = async (data) => {
        event.preventDefault()

        await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(createItemForAPiDb(data))
        })
        toDoList.text.value = ''
        loadApiToHtml(await loadDataFromApi(API_URL), toDoList.result)

    }


    const updateItemApi = async (id, event) => {

        const button = event.currentTarget

        if (button.textContent === 'Edit') {
            button.textContent = 'Submit'
            const span = event.currentTarget.parentElement.querySelector('span')
            span.parentNode.replaceChild(createElement({tag: 'input', attributes: {value: span.textContent}}), span)


        } else {
            button.textContent = 'Edit'
            const input = event.currentTarget.parentElement.querySelector('input')

            await fetch(`${API_URL}${id}`, {
                method: 'PATCH',
                header: {'Content-Type': 'application/json'},
                body: JSON.stringify(createItemForAPiDb(input.value))
            })
            loadApiToHtml(await loadDataFromApi(API_URL), toDoList.result)
        }
    }


    const deleteItemApi = async (id) => {
        await fetch(`${API_URL}${id}`, {
            method: 'DELETE',
        })

    }


    const createItemForAPiDb = (name) => {
        return {
            name
        }
    }

    const removeBtnFunctionality = async (event) => {
        await deleteItemApi(event.currentTarget.parentElement.id)
        loadApiToHtml(await loadDataFromApi(API_URL), toDoList.result)

    }

    const editBtnFunctionality = async (event) => {
        await updateItemApi(event.currentTarget.parentElement.id, event)
    }

    const createHtmlElement = (text, key) => {
        const li = createElement({tag: 'li', attributes: {id: key}})
        li.appendChild(createElement({tag: 'span', textContent: text}))
        li.appendChild(createElement({
            tag: 'button', textContent: 'Remove', buttonEven: {click: removeBtnFunctionality}
        }))
        li.appendChild(createElement({tag: 'button', textContent: 'Edit', buttonEven: {click: editBtnFunctionality}}))
        return li
    }

    const loadApiToHtml = (data, result) => {
        result.innerHTML = ''
        for (const key in data) {
            result.appendChild(createHtmlElement(data[key].name, data[key]._id))
        }
    }


    const addButtonFunctionality = async (event) => {
        event.preventDefault()
        await addItemApi(toDoList.text.value)
    }

    const loadButtonFunctionality = async (event) => {
        event.preventDefault()
        loadApiToHtml(await loadDataFromApi(API_URL), toDoList.result)
    }

    toDoList.addButton.addEventListener('click', addButtonFunctionality)
    toDoList.loadButton.addEventListener('click', loadButtonFunctionality)
}

attachEvents();





//
//
//
// async function attachEvents() {
//     const [addButton, loadButton] = document.querySelectorAll('button[type="submit"]')
//     const title = document.querySelector('#title')
//     const todoList = document.querySelector('#todo-list')
//     const API_URL = 'http://localhost:3030/jsonstore/tasks/'
//
//
//     const createElement = (tag, textContent, value, className, attributes) => {
//         const e = document.createElement(tag)
//
//         if (textContent) {
//             e.textContent = textContent
//         }
//
//         if (value) {
//             e.value = value
//         }
//
//         if (className) {
//             className.forEach(x => e.classList.add(x))
//         }
//
//         if (attributes) {
//             for (const key in attributes) {
//                 e.setAttribute(key, attributes[key])
//             }
//         }
//         return e
//     }
//
//     const resetInput = (data) => {
//         data.forEach(x => x.value= '')
//     }
//
//     const loadDataFromApi = async () => {
//         const data = await fetch(API_URL)
//         return await data.json()
//     }
//
//     const deleteElementFromHTML = (e) => {
//         e.remove()
//     }
//
//     const removeBtnFunctionality = async () => {
//         const e = event.target.parentElement
//
//         await fetch(`${API_URL}${e.id}`, {
//             method: 'DELETE'
//         })
//
//         deleteElementFromHTML(e)
//
//
//     }
//
//     const editItemFromAPiDB = async (e, value) => {
//
//         await fetch(`${API_URL}${e.id}` , {
//             method: 'PATCH',
//             header: {'Content-Type': 'application/json'},
//             body: JSON.stringify(createItemForAPiDb(value))
//         })
//
//     }
//
//     const editBtnFunctionality = async () => {
//         const e = event.target
//         const eParent = e.parentElement
//
//         if (e.textContent === 'Edit') {
//
//             const span = eParent.querySelector('span')
//             eParent.replaceChild(createElement('input', '', span.textContent), span)
//
//
//             e.textContent = 'Submit'
//         } else {
//
//             const input = eParent.querySelector('input')
//             const intputValue = input.value
//             eParent.replaceChild(createElement('span', intputValue), input)
//
//             e.textContent = 'Edit'
//             await editItemFromAPiDB(eParent, intputValue)
//             await loadDataToHTML(await loadDataFromApi())
//         }
//
//     }
//
//     const createTaskElement = async (data) => {
//         const li = createElement('li', '', '', '', {id:data._id})
//         li.appendChild(createElement('span', data.name))
//
//         const remove = createElement('button', 'Remove')
//         const edit = createElement('button', 'Edit')
//
//         remove.addEventListener('click', await removeBtnFunctionality)
//         edit.addEventListener('click', await editBtnFunctionality)
//
//         li.appendChild(remove)
//         li.appendChild(edit)
//
//         return li
//     }
//
//     const loadDataToHTML = async (data) => {
//         todoList.innerHTML = ''
//
//         for (const key in data) {
//             todoList.appendChild(await createTaskElement(data[key]))
//         }
//
//     }
//
//     const createItemForAPiDb = (item) => {
//         return {
//             name: item
//         }
//     }
//
//     const addButtonFunctionality = async () => {
//         event.preventDefault()
//         await fetch(API_URL, {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(createItemForAPiDb(title.value))
//         })
//         await loadDataToHTML(await loadDataFromApi())
//         resetInput([title])
//
//     }
//
//     const loadButtonFunctionality = async () => {
//         event.preventDefault()
//         await loadDataToHTML(await loadDataFromApi())
//     }
//
//     addButton.addEventListener('click', await addButtonFunctionality)
//     loadButton.addEventListener('click', await loadButtonFunctionality)
//
// }
//
// attachEvents();
//
//
//






// async function attachEvents() {
//     const [addBtn, loadAll] = document.querySelectorAll('button[type="submit"]')
//     const toDoList = document.querySelector('#todo-list')
//     const title = document.querySelector('#title')
//     const tasksUrlApi = 'http://localhost:3030/jsonstore/tasks/'
//
//
//     const deleteFromApi = async (e) => {
//         const el = e.target.parentElement
//
//         await fetch(`${tasksUrlApi}${event.target.parentElement.id}`, {
//             method: 'DELETE'
//         })
//         deleteElementFromApi(el)
//     }
//
//     const deleteElementFromApi = (e) => {
//         e.remove()
//     }
//
//     const getDataFromDB = async () => {
//         const data = await fetch(tasksUrlApi)
//         return await data.json()
//     }
//
//     const createTaskForDB = (nameContent) => {
//         return {
//             name: nameContent
//         }
//     }
//
//     const addBtnFunctionality = async () => {
//         event.preventDefault()
//         await fetch(tasksUrlApi, {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(createTaskForDB(title.value))
//         })
//
//         toDoList.innerHTML = ''
//
//         await loadDataToHtml(await getDataFromDB())
//     }
//
//     const loadBtnFunctionality = async () => {
//         event.preventDefault()
//         await loadDataToHtml(await getDataFromDB())
//
//     }
//
//     const removeFunctionality = async () => {
//         await deleteFromApi(event)
//     }
//
//     const editFunctionality = async () => {
//         const e = event.target
//         const el = e.parentElement
//
//         if (e.textContent === 'Edit') {
//
//             const foundSpan = el.querySelector('span')
//             el.replaceChild(createElement('input', '', e.parentElement.children[0].textContent), foundSpan)
//             e.textContent = 'Submit'
//         } else {
//             const foundInput = el.querySelector('input')
//             const newTitle = e.parentElement.children[0].value
//             el.replaceChild(createElement('span', '', e.parentElement.children[0].value), foundInput)
//
//
//             await fetch(`${tasksUrlApi}${e.parentElement.id}`, {
//                 method: 'PATCH', header: {
//                     'content-type': 'application/json'
//                 }, body: JSON.stringify({
//                     name: newTitle
//                 })
//             })
//             e.textContent = 'Edit'
//             await loadDataToHtml(await getDataFromDB())
//         }
//     }
//
//     const createLiElement = async (data) => {
//         const li = createElement('li', '', '', '', {id: data._id})
//         li.appendChild(createElement('span', data.name))
//         const remove = createElement('button', 'Remove')
//         const edit = createElement('button', 'Edit')
//
//         remove.addEventListener('click', await removeFunctionality)
//         edit.addEventListener('click', await editFunctionality)
//         li.appendChild(remove)
//         li.appendChild(edit)
//         return li
//     }
//
//     const loadDataToHtml = async (data) => {
//         toDoList.innerHTML = ''
//         for (const key in data) {
//             toDoList.appendChild(await createLiElement(data[key]))
//         }
//     }
//
//     addBtn.addEventListener('click', await addBtnFunctionality)
//     loadAll.addEventListener('click', await loadBtnFunctionality)
//
//     const createElement = (tag, textContent, value, className, attributes) => {
//         const e = document.createElement(tag)
//
//         if (textContent) {
//             e.textContent = textContent
//         }
//
//         if (value) {
//             e.value = value
//         }
//
//         if (className) {
//             className.forEach(x => e.classList.add(x))
//         }
//
//         if (attributes) {
//             for (const key in attributes) {
//                 e.setAttribute(key, attributes[key])
//             }
//         }
//         return e
//     }
//
// }
//
// attachEvents();
