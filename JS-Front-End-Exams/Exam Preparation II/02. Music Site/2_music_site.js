window.addEventListener('load', solve);

function solve() {
    const inputFields = {
        'genre': document.querySelector('#genre'),
        'name': document.querySelector('#name'),
        'author': document.querySelector('#author'),
        'date': document.querySelector('#date'),
    }

    const musicApp = {
        'addButton': document.querySelector('#add-btn'),
        'collections': document.querySelector('.all-hits-container'),
        'saved': document.querySelector('.saved-container'),
        'likes': document.querySelector('.likes > p'),
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

    const checkCorrectInputs = (dataFromInput) => dataFromInput.every(item => item.value.trim().length !== 0)

    const clearInputFields = (dataFromInput => dataFromInput.forEach(x => x.value = ''))

    const removeBtns = (element) => {
        const [save, like, _] = element.querySelectorAll('button')
        save.remove()
        like.remove()
    }

    const saveBtnFunctionality = (event) => {
        const parentElement = event.currentTarget.parentElement
        musicApp.collections.removeChild(parentElement)
        removeBtns(parentElement)

        musicApp.saved.appendChild(parentElement)

    }

    const likeBtnFunctionality = (event) => {
        const button = event.currentTarget
        button.disabled = 'true'
        const [text, number] = musicApp.likes.textContent.split(': ')
        musicApp.likes.textContent = `${text}: ${Number(number) + 1}`
    }

    const deleteBtnFunctionality = (event) => {
        const parentElement = event.currentTarget.parentElement
        parentElement.remove()
    }

    const createMusicElement = (data) => {
        const div = createElement({tag: 'div', className: ['hits-info']})
        div.appendChild(createElement({tag: 'img', attributes: {src: './static/img/img.png'}}))
        div.appendChild(createElement({tag: 'h2', textContent: `Genre: ${data.genre.value}`}))
        div.appendChild(createElement({tag: 'h2', textContent: `Name: ${data.name.value}`}))
        div.appendChild(createElement({tag: 'h2', textContent: `Author: ${data.author.value}`}))
        div.appendChild(createElement({tag: 'h3', textContent: `Date: ${data.date.value}`}))
        div.appendChild(createElement({
            tag: 'button', textContent: 'Save song', className: ['save-btn'], buttonEven: {click: saveBtnFunctionality}
        }))
        div.appendChild(createElement({
            tag: 'button', textContent: 'Like song', className: ['like-btn'], buttonEven: {click: likeBtnFunctionality}
        }))
        div.appendChild(createElement({
            tag: 'button', textContent: 'Delete', className: ['delete-btn'], buttonEven: {click: deleteBtnFunctionality}
        }))

        return div
    }


    const addButtonFunctionality = (event) => {
        event.preventDefault()
        const data = Object.values(inputFields)

        if (!checkCorrectInputs(data)) return

        musicApp.collections.appendChild(createMusicElement(inputFields))
        clearInputFields(data)

    }

    musicApp.addButton.addEventListener('click', addButtonFunctionality)
}







//
//
// window.addEventListener('load', solve);
//
// function solve() {
//     const inputElements = Array.from(document.querySelectorAll('input[type="text"]'))
//     const addBtn = document.querySelector('#add-btn')
//     const allHits = document.querySelector('.all-hits-container')
//
//     function correctInput() {
//
//         for (const item of inputElements) {
//             if (item.value.trim().length === 0) {
//                 return false
//             }
//         }
//         return true
//     }
//
//     function clearInputFields() {
//         inputElements.forEach(x => {
//             x.value = ''
//         })
//     }
//
//     function createElementWithClass(tag, className) {
//         const e = document.createElement(tag)
//         e.classList.add(className)
//         return e
//     }
//
//     function createElementWithTextContent(tag, textContent) {
//         const e = document.createElement(tag)
//         e.textContent = textContent
//         return e
//     }
//
//     function createButtonWithClassAndTextContent(tag, textContent, className) {
//         const b = createElementWithClass(tag, className)
//         b.textContent = textContent
//         return b
//     }
//
//     function createElementImg(tag, src) {
//         const i = document.createElement(tag)
//         i.src = src
//         return i
//     }
//
//     function createSongInformation(div) {
//         div.appendChild(createElementImg('img', './static/img/img.png'))
//         inputElements.forEach(x => {
//             div.appendChild(createElementWithTextContent(x.name === 'date' ? 'h3' : 'h2', `${x.name.charAt(0).toUpperCase() + x.name.slice(1)}: ${x.value}`))
//         })
//         return div
//
//
//     }
//
//     function createBtns(div) {
//         Array.from(['Save song!save-btn', 'Like song!like-btn', 'Delete!delete-btn']).forEach(x => {
//             div.appendChild(createButtonWithClassAndTextContent('button', ...x.split('!')))
//         })
//         return div
//     }
//
//     function removeBtns(div) {
//         Array.from(['.save-btn', '.like-btn']).forEach(x => {
//             div.removeChild(div.querySelector(x))
//         })
//         return div
//     }
//
//     addBtn.addEventListener('click', () => {
//         if (!correctInput()) {
//             return
//         }
//
//         const div = createBtns(createSongInformation(createElementWithClass('div', 'hits-info')))
//
//         allHits.appendChild(div)
//         clearInputFields()
//
//         const allButtons = Array.from(document.querySelectorAll('button'))
//
//         allButtons.forEach(x => {
//             x.addEventListener('click', (event) => {
//
//                 if (x.textContent === 'Save song') {
//                     const div = removeBtns(x.parentElement)
//                     const savedContainer = document.querySelector('.saved-container')
//
//                     allHits.removeChild(div)
//                     savedContainer.appendChild(div)
//
//                 } else if (x.textContent === 'Like song' && !x.disabled) {
//                     const likes = document.querySelector('.likes > p')
//                     const [text, counter] = likes.textContent.split(': ')
//                     likes.textContent = `${text}: ${Number(counter) + 1}`
//                     x.disabled = true
//
//                 } else if (x.textContent === 'Delete') {
//                     const div = x.parentElement
//                     div.parentElement.removeChild(div)
//                 }
//             })
//         })
//     })
// }
