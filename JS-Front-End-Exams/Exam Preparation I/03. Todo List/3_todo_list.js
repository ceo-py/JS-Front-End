async function attachEvents() {
    const [addBtn, loadAll] = document.querySelectorAll('button[type="submit"]')
    const toDoList = document.querySelector('#todo-list')
    const title = document.querySelector('#title')
    const tasksUrlApi = 'http://localhost:3030/jsonstore/tasks/'


    const deleteFromApi = async (e) => {
        const el = e.target.parentElement

        await fetch(`${tasksUrlApi}${event.target.parentElement.id}`, {
            method: 'DELETE'
        })
        deleteElementFromApi(el)
    }

    const deleteElementFromApi = (e) => {
        e.remove()
    }

    const getDataFromDB = async () => {
        const data = await fetch(tasksUrlApi)
        return await data.json()
    }

    const createTaskForDB = (nameContent) => {
        return {
            name: nameContent
        }
    }

    const addBtnFunctionality = async () => {
        event.preventDefault()
        await fetch(tasksUrlApi, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(createTaskForDB(title.value))
        })

        toDoList.innerHTML = ''

        await loadDataToHtml(await getDataFromDB())
    }

    const loadBtnFunctionality = async () => {
        event.preventDefault()
        await loadDataToHtml(await getDataFromDB())

    }

    const removeFunctionality = async () => {
        await deleteFromApi(event)
    }

    const editFunctionality = async () => {
        const e = event.target
        const el = e.parentElement

        if (e.textContent === 'Edit') {

            const foundSpan = el.querySelector('span')
            el.replaceChild(createElement('input', '', e.parentElement.children[0].textContent), foundSpan)
            e.textContent = 'Submit'
        } else {
            const foundInput = el.querySelector('input')
            const newTitle = e.parentElement.children[0].value
            el.replaceChild(createElement('span', '', e.parentElement.children[0].value), foundInput)
            
            
            await fetch(`${tasksUrlApi}${e.parentElement.id}`, {
                method: 'PATCH', header: {
                    'content-type': 'application/json'
                }, body: JSON.stringify({
                    name: newTitle
                })
            })
            e.textContent = 'Edit'
            await loadDataToHtml(await getDataFromDB())
        }
    }

    const createLiElement = async (data) => {
        const li = createElement('li', '', '', '', {id: data._id})
        li.appendChild(createElement('span', data.name))
        const remove = createElement('button', 'Remove')
        const edit = createElement('button', 'Edit')

        remove.addEventListener('click', await removeFunctionality)
        edit.addEventListener('click', await editFunctionality)
        li.appendChild(remove)
        li.appendChild(edit)
        return li
    }

    const loadDataToHtml = async (data) => {
        toDoList.innerHTML = ''
        for (const key in data) {
            toDoList.appendChild(await createLiElement(data[key]))
        }
    }

    addBtn.addEventListener('click', await addBtnFunctionality)
    loadAll.addEventListener('click', await loadBtnFunctionality)

    const createElement = (tag, textContent, value, className, attributes) => {
        const e = document.createElement(tag)

        if (textContent) {
            e.textContent = textContent
        }

        if (value) {
            e.value = value
        }

        if (className) {
            className.forEach(x => e.classList.add(x))
        }

        if (attributes) {
            for (const key in attributes) {
                e.setAttribute(key, attributes[key])
            }
        }
        return e
    }

}

attachEvents();
