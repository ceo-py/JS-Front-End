window.addEventListener("load", solve);

function solve() {
    const homeMaintenance = {
        inputFields: [...document.querySelectorAll('input[type="text"]')],
        addBtn: document.querySelector('#add-btn'),
        taskList: document.querySelector('#task-list'),
        doneList: document.querySelector('#done-list'),
        editData: null
    }


    const doneBtnHandler = (e) => {
        const currentElement = e.target.parentNode.parentNode
        currentElement.querySelector('.buttons').remove()
        currentElement.innerHTML += `<button class="delete">Delete</button>`
        currentElement.querySelector('button').addEventListener('click', (e) => e.target.parentNode.remove())
        homeMaintenance.doneList.appendChild(currentElement)
        homeMaintenance.taskList.innerHTML = ''
    }

    const editBtnHandler = () => {
        homeMaintenance.inputFields.forEach((x, i) => x.value = homeMaintenance.editData[i])
        homeMaintenance.taskList.innerHTML = ''
    }
    const addBtnHandler = () => {
        if (homeMaintenance.inputFields.some(x => x.value === '')) return
        homeMaintenance.editData = homeMaintenance.inputFields.map(x => x.value)
        homeMaintenance.taskList.innerHTML = `
        <li class="clean-task">
            <article>
                ${homeMaintenance.inputFields.map(x => `<p>${x.id.charAt(0).toUpperCase() + x.id.slice(1)}:${x.value}</p>`).join('')}
            </article>
            <div class="buttons">
                <button class="edit">Edit</button>
                <button class="done">Done</button>
            </div>
        </li>`;
        [...homeMaintenance.taskList.querySelectorAll('button')].forEach((x, i) => x.addEventListener('click', i % 2 === 0 ? editBtnHandler : doneBtnHandler))
        homeMaintenance.inputFields.forEach(x => x.value = '')
    }
    homeMaintenance.addBtn.addEventListener('click', addBtnHandler)
}


// function solve() {
//     const homeMaintenance = {
//         inputFields: [...document.querySelectorAll('input[type="text"]')],
//         form: document.querySelector('form'),
//         addBtn: document.querySelector('#add-btn'),
//         taskList: document.querySelector('#task-list'),
//         doneList: document.querySelector('#done-list'),
//         editData: null
//     }
//
//     const deleteBtnHandler = (e) => {
//         e.target.parentNode.remove()
//     }
//
//     const doneBtnHandler = (e) => {
//         const currentElement = e.target.parentNode.parentNode
//         currentElement.querySelector('.buttons').remove()
//         const buttonDelete = document.createElement('button')
//         buttonDelete.classList.add('delete')
//         buttonDelete.textContent = 'Delete'
//         buttonDelete.addEventListener('click', deleteBtnHandler)
//         currentElement.appendChild(buttonDelete)
//         homeMaintenance.doneList.appendChild(currentElement)
//         homeMaintenance.taskList.innerHTML = ''
//     }
//
//     const editBtnHandler = () => {
//         homeMaintenance.inputFields.forEach((x, i) => x.value = homeMaintenance.editData[i])
//         homeMaintenance.taskList.innerHTML = ''
//     }
//     const addBtnHandler = () => {
//         if (homeMaintenance.inputFields.some(x => x.value === '')) return
//         homeMaintenance.editData = homeMaintenance.inputFields.map(x => x.value)
//         homeMaintenance.taskList.innerHTML = `
//         <li class="clean-task">
//             <article>
//                 ${homeMaintenance.inputFields.map(x => `<p>${x.id.charAt(0).toUpperCase() + x.id.slice(1)}:${x.value}</p>`)}
//             </article>
//             <div class="buttons">
//                 <button class="edit">Edit</button>
//                 <button class="done">Done</button>
//             </div>
//         </li>`;
//         [...homeMaintenance.taskList.querySelectorAll('button')].forEach((x, i) => x.addEventListener('click', i % 2 === 0 ? editBtnHandler : doneBtnHandler))
//         homeMaintenance.form.reset()
//     }
//     homeMaintenance.addBtn.addEventListener('click', addBtnHandler)
// }


// function solve() {
//     const homeMaintenance = {
//         inputFields: [...document.querySelectorAll('input[type="text"]')],
//         form: document.querySelector('form'),
//         addBtn: document.querySelector('#add-btn'),
//         taskList: document.querySelector('#task-list'),
//         doneList: document.querySelector('#done-list'),
//         editData: null
//     }
//
//     const deleteBtnHandler = (e) => {
//         e.target.parentNode.remove()
//     }
//
//     const doneBtnHandler = (e) => {
//         const currentElement = e.target.parentNode.parentNode
//         currentElement.querySelector('.buttons').remove()
//         currentElement.innerHTML += `<button class="delete">Delete</button>`
//         currentElement.querySelector('button').addEventListener('click', deleteBtnHandler)
//         homeMaintenance.doneList.appendChild(currentElement)
//         homeMaintenance.taskList.innerHTML = ''
//     }
//
//     const editBtnHandler = () => {
//         homeMaintenance.inputFields.forEach((x, i) => x.value = homeMaintenance.editData[i])
//         homeMaintenance.taskList.innerHTML = ''
//     }
//     const addBtnHandler = () => {
//         if (homeMaintenance.inputFields.some(x => x.value === '')) return
//         homeMaintenance.editData = homeMaintenance.inputFields.map(x => x.value)
//         homeMaintenance.taskList.innerHTML = `
//         <li class="clean-task">
//             <article>
//                 ${homeMaintenance.inputFields.map(x => `<p>${x.id.charAt(0).toUpperCase() + x.id.slice(1)}:${x.value}</p>`)}
//             </article>
//             <div class="buttons">
//                 <button class="edit">Edit</button>
//                 <button class="done">Done</button>
//             </div>
//         </li>`;
//         [...homeMaintenance.taskList.querySelectorAll('button')].forEach((x, i) => x.addEventListener('click', i % 2 === 0 ? editBtnHandler : doneBtnHandler))
//         homeMaintenance.form.reset()
//     }
//     homeMaintenance.addBtn.addEventListener('click', addBtnHandler)
// }