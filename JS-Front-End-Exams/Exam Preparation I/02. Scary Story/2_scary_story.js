function solve() {
    const dataFromInput = Array.from(document.querySelectorAll('#first-name, #last-name, #age, #story-title, #genre, #story'))
    const [firstName, lastName, age, storyTitle, genre, story] = dataFromInput
    const previewList = document.querySelector('#preview-list')
    const publishBtn = document.querySelector('#form-btn')


    const createElement = ({tag, textContent = '', value = '', className = [], attributes = {}, buttonEven = {}}) => {
        const e = document.createElement(tag);
        e.textContent = textContent;
        e.value = value;
        className.forEach(x => e.classList.add(x));
        for (const [key, value] of Object.entries(attributes)) {
            e.setAttribute(key, value);
        }
        for (const [key, value] of Object.entries(buttonEven)) {
            e.addEventListener(key, value);
        }
        return e;
    };

    const checkCorrectInputs = (dataFromInput) => dataFromInput.every(item => item.value.trim().length !== 0);

    const clearInputFields = (dataFromInput => dataFromInput.forEach(x => x.value = ''))

    const splitData = (data) => {
        return data.split(': ').slice(1)[0]
    }

    const deleteElement = (element, toDeleteFrom) => toDeleteFrom.removeChild(element)

    const saveBtnFunctionality = () => {
        const main = document.querySelector('#main')
        main.innerHTML = ''
        main.appendChild(createElement({tag: 'h1', textContent: 'Your scary story is saved!'}))
    }

    const editBtnFunctionality = () => {
        const [nameEdit, ageEdit, storyTitleEdit, genreEdit, storyEdit] = Array.from(document.querySelectorAll('h4, p'))
        const [fName, lName] = splitData(nameEdit.textContent).split(' ')

        firstName.value = fName
        lastName.value = lName
        age.value = splitData(ageEdit.textContent)
        storyTitle.value = splitData(storyTitleEdit.textContent)
        genre.value = splitData(genreEdit.textContent)
        story.value = storyEdit.textContent

        publishBtn.disabled = false
        deleteElement(document.querySelector('.story-info'), previewList)
    }

    const deleteBtnFunctionality = () => {
        publishBtn.disabled = false
        deleteElement(document.querySelector('.story-info'), previewList)
    }

    publishBtn.addEventListener('click', () => {
        if (!checkCorrectInputs(dataFromInput)) {
            return
        }

        publishBtn.disabled = true
        const li = createElement({tag: 'li', className: ['story-info']})
        const article = createElement({tag: 'article'})
        article.appendChild(createElement({tag: 'h4', textContent: `Name: ${firstName.value} ${lastName.value}`}))
        article.appendChild(createElement({tag: 'p', textContent: `Age: ${age.value}`}))
        article.appendChild(createElement({tag: 'p', textContent: `Title: ${storyTitle.value}`}))
        article.appendChild(createElement({tag: 'p', textContent: `Genre: ${genre.value}`}))
        article.appendChild(createElement({tag: 'p', textContent: story.value}))
        li.appendChild(article)

        const saveBtn = createElement({tag: 'button', textContent: 'Save Story', className: ['save-btn'], buttonEven: {click: saveBtnFunctionality}})
        const editBtn = createElement({tag: 'button', textContent: 'Edit Story', className: ['edit-btn'], buttonEven: {click: editBtnFunctionality}})
        const deleteBtn = createElement({tag: 'button', textContent: 'Delete Story', className: ['delete-btn'], buttonEven: {click: deleteBtnFunctionality}})

        li.appendChild(saveBtn)
        li.appendChild(editBtn)
        li.appendChild(deleteBtn)

        previewList.appendChild(li)

        clearInputFields(dataFromInput)
    })
}

solve()


//
// function solve() {
//     const firstName = document.querySelector('#first-name')
//     const lastName = document.querySelector('#last-name')
//     const age = document.querySelector('#age')
//     const storyTitle = document.querySelector('#story-title')
//     const genre = document.querySelector('#genre')
//     const story = document.querySelector('#story')
//     const dataFromInput = Array.from([firstName, lastName, age, storyTitle, genre, story])
//     const previewList = document.querySelector('#preview-list')
//     let personInformation = {}
//
//     const publishBtn = document.querySelector('#form-btn')
//
//
//     function checkCorrectInputs() {
//         for (const item of dataFromInput) {
//             if (item.value.trim().length === 0) {
//                 return false
//             }
//         }
//         return true
//     }
//
//     function clearInputFields() {
//         dataFromInput.forEach((x, index) => {
//             if (index !== 4) {
//                 x.value = ''
//             }
//         })
//     }
//
//     function createElement(tag, content) {
//         let e = document.createElement(tag)
//         e.textContent = content
//         return e
//     }
//
//     function createButton(className, tag, value) {
//         let e = createElement(tag, value)
//         e.classList.add(className)
//         return e
//     }
//
//     function createArticle() {
//         let article = document.createElement('article')
//         for (const key in personInformation) {
//             article.appendChild(createElement(key === 'name' ? 'h4' : 'p', personInformation[key]))
//         }
//         return article
//     }
//
//     function storePersonInformation() {
//         return {
//             name: `Name: ${firstName.value} ${lastName.value}`,
//             age: `Age: ${age.value}`,
//             title: `Title: ${storyTitle.value}`,
//             genre: `Genre: ${genre.value}`,
//             story: story.value
//         }
//     }
//
//     function editPersonInformation() {
//         let index = 2
//         for (const key in personInformation) {
//             let [_, data] = personInformation[key].split(': ')
//             if (key === 'name') {
//                 let [first, last] = data.split(' ')
//                 dataFromInput[0].value = first
//                 dataFromInput[1].value = last
//
//             } else if (key !== 'story') {
//                 dataFromInput[index].value = data
//                 index += 1
//             } else {
//                 dataFromInput[index].value = personInformation[key]
//             }
//
//         }
//     }
//
//     function deleteLi() {
//         const foundLi = document.querySelector('.story-info')
//         previewList.removeChild(foundLi)
//     }
//
//     publishBtn.addEventListener('click', () => {
//         if (!checkCorrectInputs()) {
//             return
//         }
//         personInformation = storePersonInformation()
//         clearInputFields()
//         publishBtn.disabled = true
//
//
//         let li = document.createElement('li')
//         li.classList.add('story-info')
//
//         li.appendChild(createArticle())
//
//         li.appendChild(createButton('save-btn', 'button', 'Save Story'))
//         li.appendChild(createButton('edit-btn', 'button', 'Edit Story'))
//         li.appendChild(createButton('delete-btn', 'button', 'Delete Story'))
//         previewList.appendChild(li)
//
//
//         const editBtn = document.querySelector('.edit-btn')
//         editBtn.addEventListener('click', () => {
//             editPersonInformation()
//             publishBtn.disabled = false
//             deleteLi()
//         })
//
//         const deleteBtn = document.querySelector('.delete-btn')
//         deleteBtn.addEventListener('click', () => {
//             publishBtn.disabled = false
//             deleteLi()
//         })
//
//         const saveBtn = document.querySelector('.save-btn')
//         saveBtn.addEventListener('click', () => {
//             const main = document.querySelector('#main')
//             const body = document.querySelector('.body')
//             let div = document.createElement('div')
//             div.setAttribute('id', 'main')
//             body.removeChild(main)
//             div.appendChild(createElement('h1', 'Your scary story is saved!'))
//             body.appendChild(div)
//         })
//
//     })
//
//
// }
