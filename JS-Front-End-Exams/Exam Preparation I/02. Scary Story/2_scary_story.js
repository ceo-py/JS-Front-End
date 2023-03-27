function solve() {
    const firstName = document.querySelector('#first-name')
    const lastName = document.querySelector('#last-name')
    const age = document.querySelector('#age')
    const storyTitle = document.querySelector('#story-title')
    const genre = document.querySelector('#genre')
    const story = document.querySelector('#story')
    const previewList = document.querySelector('#preview-list')
    const dataFromInput = Array.from([firstName, lastName, age, storyTitle, genre, story])
    let personInformation = {}

    const publishBtn = document.querySelector('#form-btn')


    function checkCorrectInputs() {
        for (const item of dataFromInput) {
            if (item.value.trim().length === 0) {
                return false
            }
        }
        return true
    }

    function clearInputFields() {
        dataFromInput.forEach((x, index) => {
            if (index !== 4) {
                x.value = ''
            }
        })
    }

    function createElement(tag, content) {
        let e = document.createElement(tag)
        e.textContent = content
        return e
    }

    function createButton(className, tag, value) {
        let e = createElement(tag, value)
        e.classList.add(className)
        return e
    }

    function createArticle() {
        let article = document.createElement('article')
        for (const key in personInformation) {
            article.appendChild(createElement(key === 'name' ? 'h4' : 'p', personInformation[key]))
        }
        return article
    }

    function storePersonInformation() {
        return {
            name: `Name: ${firstName.value} ${lastName.value}`,
            age: `Age: ${age.value}`,
            title: `Title: ${storyTitle.value}`,
            genre: `Genre: ${genre.value}`,
            story: story.value
        }
    }

    function editPersonInformation() {
        let index = 2
        for (const key in personInformation) {
            let [_, data] = personInformation[key].split(': ')
            if (key === 'name') {
                let [first, last] = data.split(' ')
                dataFromInput[0].value = first
                dataFromInput[1].value = last

            } else if (key !== 'story') {
                dataFromInput[index].value = data
                index += 1
            } else {
                dataFromInput[index].value = personInformation[key]
            }

        }
    }

    function deleteLi() {
        const foundLi = document.querySelector('.story-info')
        previewList.removeChild(foundLi)
    }

    publishBtn.addEventListener('click', () => {
        if (!checkCorrectInputs()) {
            return
        }
        personInformation = storePersonInformation()
        clearInputFields()
        publishBtn.disabled = true


        let li = document.createElement('li')
        li.classList.add('story-info')

        li.appendChild(createArticle())

        li.appendChild(createButton('save-btn', 'button', 'Save Story'))
        li.appendChild(createButton('edit-btn', 'button', 'Edit Story'))
        li.appendChild(createButton('delete-btn', 'button', 'Delete Story'))
        previewList.appendChild(li)


        const editBtn = document.querySelector('.edit-btn')
        editBtn.addEventListener('click', () => {
            editPersonInformation()
            publishBtn.disabled = false
            deleteLi()
        })

        const deleteBtn = document.querySelector('.delete-btn')
        deleteBtn.addEventListener('click', () => {
            publishBtn.disabled = false
            deleteLi()
        })

        const saveBtn = document.querySelector('.save-btn')
        saveBtn.addEventListener('click', () => {
            const main = document.querySelector('#main')
            const body = document.querySelector('.body')
            let div = document.createElement('div')
            div.setAttribute('id', 'main')
            body.removeChild(main)
            div.appendChild(createElement('h1', 'Your scary story is saved!'))
            body.appendChild(div)
        })

    })


}