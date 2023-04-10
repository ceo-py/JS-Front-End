window.addEventListener('load', solve);

function solve() {
    const inputFields = {
        title: document.querySelector('#title'),
        description: document.querySelector('#description'),
        label: document.querySelector('#label'),
        points: document.querySelector('#points'),
        assignee: document.querySelector('#assignee'),
    }
    const sprintApp = {
        createBtn: document.querySelector('#create-task-btn'),
        deleteBtn: document.querySelector('#delete-task-btn'),
        input: document.querySelector('input'),
        taskSection: document.querySelector('#tasks-section'),
        points: document.querySelector('#total-sprint-points'),
        taskIdNumber: 1
    }
    const taskInfo = {}
    const buttonLabels = {
        'Feature': {
            class: "feature",
            textContent: 'Feature &#8865;'
        },
        'Low Priority Bug': {
            class: "low-priority",
            textContent: 'Low Priority Bug &#9737;'
        },
        'High Priority Bug': {
            class: "high-priority",
            textContent: 'High Priority Bug &#9888;'
        },
    }

    const checkCorrectInputs = (dataFromInput) => dataFromInput.every(item => item.value.trim().length !== 0)

    const clearInputFields = (dataFromInput => dataFromInput.forEach(x => x.value = ''))

    const deleteTaskBtnFunctionality = (event) => {
        const id = event.currentTarget.parentElement.parentElement.id
        sprintApp.input.id = id
        Object.values(inputFields).forEach((x, index) => {
            x.value = taskInfo[id][index]
            x.disabled = true
        })
        sprintApp.createBtn.disabled = true
        sprintApp.deleteBtn.disabled = false
    }

    const changePoints = (points) => {
        const currentPoints = Number(sprintApp.points.textContent.replace('Total Points ', '').replace('pts', ''))
        sprintApp.points.textContent = `Total Points ${currentPoints + points}pts`
    }

    const createTaskHtmlElement = (event) => {
        const article = document.createElement('article');
        article.setAttribute('id', `task-${sprintApp.taskIdNumber}`);
        article.classList.add('task-card');
        article.innerHTML = `
            <div class="task-card-label ${buttonLabels[inputFields.label.value].class}">${buttonLabels[inputFields.label.value].textContent}</div>
            <h3 class="task-card-title">${inputFields.title.value}</h3>
            <p class="task-card-description">${inputFields.description.value}</p>
            <div class="task-card-points">Estimated at ${inputFields.points.value} pts</div>
            <div class="task-card-assignee">Assigned to: ${inputFields.assignee.value}</div>
            <div class="task-card-actions">
                <button>Delete</button>
            </div>
        `
        article.querySelector('button').addEventListener('click', deleteTaskBtnFunctionality)

        changePoints(Number(inputFields.points.value))
        taskInfo[`task-${sprintApp.taskIdNumber}`] = []

        Object.values(inputFields).forEach(x => taskInfo[`task-${sprintApp.taskIdNumber}`].push(x.value))
        sprintApp.taskIdNumber += 1
        return article
    }

    const createBtnFunctionality = (event) => {
        event.preventDefault()
        const data = Object.values(inputFields)
        if (!checkCorrectInputs(data)) return
        sprintApp.taskSection.appendChild(createTaskHtmlElement(inputFields))
        clearInputFields(data)
    }

    const deleteBtnFunctionality = (event) => {
        event.preventDefault()
        const [_, taskToDelete] = Array.from(document.querySelectorAll(`#${sprintApp.input.id}`))
        taskToDelete.remove()
        delete taskInfo[sprintApp.input.id]
        changePoints(-Number(inputFields.points.value))
        sprintApp.createBtn.disabled = false
        sprintApp.deleteBtn.disabled = true
        const data = Object.values(inputFields)
        clearInputFields(data)
        data.forEach(x => x.disabled = false)
    }


    sprintApp.createBtn.addEventListener('click', createBtnFunctionality)
    sprintApp.deleteBtn.addEventListener('click', deleteBtnFunctionality)
}




// without inner html for elements
// function solve() {
//     const inputFields = {
//         title: document.querySelector('#title'),
//         description: document.querySelector('#description'),
//         label: document.querySelector('#label'),
//         points: document.querySelector('#points'),
//         assignee: document.querySelector('#assignee'),
//     }
//     const sprintApp = {
//             createBtn:document.querySelector('#create-task-btn'),
//             deleteBtn:document.querySelector('#delete-task-btn'),
//             input:document.querySelector('input'),
//             taskSection:document.querySelector('#tasks-section'),
//             points:document.querySelector('#total-sprint-points'),
//             taskIdNumber: 1
//         }
//     const taskInfo = {}
//     const buttonLabels = {
//         'Feature': {
//             class: "feature",
//             textContent: 'Feature: &#8865;'
//         },
//         'Low Priority Bug': {
//             class: "low-priority",
//             textContent: 'Low Priority Bug: &#9737;'
//         },
//         'High Priority Bug': {
//             class: "high-priority",
//             textContent: 'High Priority Bug: &#9888;'
//         },
//     }
//
//     const createElement = ({
//                                tag,
//                                textContent = '',
//                                value = '',
//                                className = [],
//                                attributes = {},
//                                buttonEvent = {},
//                                parent = '',
//                                 innerHTML= ''
//                            }) => {
//         const e = document.createElement(tag)
//         if (textContent) e.textContent = textContent
//         if (value) e.value = value
//         if (innerHTML) e.innerHTML = innerHTML
//         className.forEach(x => e.classList.add(x))
//         for (const [key, value] of Object.entries(attributes)) {
//             e.setAttribute(key, value)
//         }
//         for (const [key, value] of Object.entries(buttonEvent)) {
//             e.addEventListener(key, value)
//         }
//         if (parent) {
//             parent.appendChild(e)
//         } else {
//             return e
//         }
//
//     }
//
//     const checkCorrectInputs = (dataFromInput) => dataFromInput.every(item => item.value.trim().length !== 0)
//
//     const clearInputFields = (dataFromInput => dataFromInput.forEach(x => x.value = ''))
//    
//     const deleteTaskBtnFunctionality = (event) => {
//         const id = event.currentTarget.parentElement.parentElement.id
//         sprintApp.input.id = id
//         Object.values(inputFields).forEach((x, index) => {
//             x.value = taskInfo[id][index]
//             x.disabled = true
//         })
//         sprintApp.createBtn.disabled = true
//         sprintApp.deleteBtn.disabled = false
//     }
//    
//     const changePoints = (points) => {
//         const currentPoints = Number(sprintApp.points.textContent.replace('Total Points ', '').replace('pts', ''))
//         sprintApp.points.textContent = `Total Points ${currentPoints + points}pts`
//     }
//    
//     const createTaskHtmlElement = (event) => {
//         const article = createElement({
//             tag: 'article',
//             attributes: {id: `task-${sprintApp.taskIdNumber}`
//             },
//             className: ['task-card']
//         })
//         createElement({
//             tag: 'div',
//             className: [`task-card-label`, buttonLabels[inputFields.label.value].class],
//             innerHTML: buttonLabels[inputFields.label.value].textContent,
//             parent: article
//         })
//         createElement({
//             tag: 'h3',
//             className: ['task-card-title'],
//             textContent: inputFields.title.value,
//             parent: article
//         })
//         createElement({
//             tag: 'p',
//             className: ['task-card-description'],
//             textContent: inputFields.description.value,
//             parent: article
//         })
//         createElement({
//             tag: 'div',
//             className: ['task-card-points'],
//             textContent: `Estimated at ${inputFields.points.value} pts`,
//             parent: article
//         })
//         createElement({
//             tag: 'div',
//             className: ['task-card-assignee'],
//             textContent: `Assigned to: ${inputFields.assignee.value}`,
//             parent: article
//         })
//         const div = createElement({
//             tag: 'div',
//             className: ['task-card-actions'],
//         })
//         createElement({
//             tag: 'button',
//             textContent: 'Delete',
//             buttonEvent: {click: deleteTaskBtnFunctionality},
//             parent: div
//         })
//         article.appendChild(div)
//        
//         changePoints(Number(inputFields.points.value))
//         taskInfo[`task-${sprintApp.taskIdNumber}`] = []
//        
//         Object.values(inputFields).forEach(x => taskInfo[`task-${sprintApp.taskIdNumber}`].push(x.value))
//         sprintApp.taskIdNumber += 1
//         return article
//     }
//
//     const createBtnFunctionality = (event) => {
//         event.preventDefault()
//         const data = Object.values(inputFields)
//         if (!checkCorrectInputs(data)) return
//         sprintApp.taskSection.appendChild(createTaskHtmlElement(inputFields))
//         clearInputFields(data)
//     }
//
//     const deleteBtnFunctionality = (event) => {
//         event.preventDefault()
//         const [_, taskToDelete] = Array.from(document.querySelectorAll(`#${sprintApp.input.id}`))
//         taskToDelete.remove()
//         delete taskInfo[sprintApp.input.id]
//         changePoints(- Number(inputFields.points.value))
//         sprintApp.createBtn.disabled = false
//         sprintApp.deleteBtn.disabled = true
//         const data = Object.values(inputFields)
//         clearInputFields(data)
//         data.forEach(x => x.disabled = false)
//     }
//
//
//     sprintApp.createBtn.addEventListener('click', createBtnFunctionality)
//     sprintApp.deleteBtn.addEventListener('click', deleteBtnFunctionality)
// }
