window.addEventListener("load", solve);

function solve() {
    const API_URL = 'http://localhost:3030/jsonstore/tasks/'
    
    const inputFields = {
        name: document.querySelector('#course-name'),
        teacherName: document.querySelector('#teacher-name'),
        type: document.querySelector('#course-type'),
        description: document.querySelector('#description'),
    }

    const courseApp = {
        addCourse:document.querySelector('#add-course'),
        editCourse:document.querySelector('#edit-course'),
        loadCourse:document.querySelector('#load-course'),
        list:document.querySelector('#list'),
        
    }

    let idEdit = null
    
    const apiRequest = async ({url = '', method = '', id = '', item = ''}) => {
        const options = {
            method: method
        }
        if (['PATCH', 'POST'].includes(method)) {
            options.headers = {'Content-Type': 'application/json'}
            options.body = JSON.stringify(item)
        }
        const data = await fetch(`${url}${id}`, options)
        clearInputFields(Object.values(inputFields))
        // loadApiToHtml(await data.json())
        return await data.json()
        
    }
    
    const clearInputFields = (dataFromInput => dataFromInput.forEach(x => x.value = ''))

    const editFunctionality = async (event) => {
        event.preventDefault()
        idEdit = event.currentTarget.id
        const currentContainer = event.currentTarget.parentElement
        
        const data = Array.from(currentContainer.querySelectorAll('h2, h3, h4'))
        Object.values(inputFields).forEach((x, index) => x.value = data[index].textContent)
        courseApp.addCourse.disabled = true
        courseApp.editCourse.disabled = false
        currentContainer.remove()
    }

    const finishFunctionality = async (event) => {
        const id = event.currentTarget.id

        await apiRequest({
            url: `${API_URL}`,
            id: id,
            method: 'DELETE'
        })
        loadApiToHtml(await apiRequest({
            url: API_URL,
            method: 'GET'
        }))
    }

    const createHtmlElement = (data) => {
        const div = document.createElement('div')
        div.classList.add('container')
        div.innerHTML = `<h2>${data.title}</h2>
            <h3>${data.teacher}</h3>
            <h3>${data.type}</h3>
            <h4>${data.description}</h4>
            <button class="edit-btn">Edit Course</button>
            <button class="finish-btn">Finish Course</button>`
        const [edit, finish] = Array.from(div.querySelectorAll('button'))
        edit.setAttribute('id', data._id)
        edit.addEventListener('click', editFunctionality)
        finish.addEventListener('click', finishFunctionality)
        finish.setAttribute('id', data._id)
        
        return div
    }

    const loadApiToHtml = (data) => {
        courseApp.list.innerHTML = ''
        Object.values(data).forEach(x => courseApp.list.appendChild(createHtmlElement(x)))
    }

    const addCourseFunctionality = async (event) => {
        event.preventDefault()
        if (!['Long', 'Medium', 'Short'].includes(inputFields.type.value )) return
        await apiRequest({
            url: API_URL,
            method: 'POST',
            item: {
                title: inputFields.name.value,
                type: inputFields.type.value,
                description: inputFields.description.value,
                teacher: inputFields.teacherName.value,
            }
        })

        loadApiToHtml(await apiRequest({
            url: API_URL,
            method: 'GET'
        }))
    }
    
    const loadCourseFunctionality = async (event) => {
        loadApiToHtml(await apiRequest({
            url: API_URL,
            method: 'GET'
        }))
    }

    const editCourseFunctionality = async (event) => {
        event.preventDefault()

        await apiRequest({
            url: API_URL,
            method: 'PATCH',
            id: idEdit,
            item: {
                title: inputFields.name.value,
                type: inputFields.type.value,
                description: inputFields.description.value,
                teacher: inputFields.teacherName.value,
            }
        })
        courseApp.addCourse.disabled = false
        courseApp.editCourse.disabled = true
        loadApiToHtml(await apiRequest({
            url: API_URL,
            method: 'GET'
        }))
    }
    
    courseApp.addCourse.addEventListener('click', addCourseFunctionality)
    courseApp.loadCourse.addEventListener('click', loadCourseFunctionality)
    courseApp.editCourse.addEventListener('click', editCourseFunctionality)
}