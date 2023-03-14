window.addEventListener('load', solve);

function solve() {
    const inputElements = Array.from(document.querySelectorAll('input[type="text"]'))
    const addBtn = document.querySelector('#add-btn')
    const allHits = document.querySelector('.all-hits-container')
    let likes = document.querySelector('.likes > p')


    function correctInput() {
        for (const item of inputElements) {
            if (item.value.trim().length === 0) {
                return false
            }
        }
        return true
    }

    function clearInputFields() {
        inputElements.forEach(x => {
            x.value = ''
        })
    }

    function createElementWithClass(tag, className) {
        const e = document.createElement(tag)
        e.classList.add(className)
        return e
    }

    function createElementWithTextContent(tag, textContent) {
        const e = document.createElement(tag)
        e.textContent = textContent
        return e
    }

    function createButtonWithClassAndTextContent(tag, textContent, className) {
        const b = createElementWithTextContent(tag, textContent)
        b.classList.add(className)
        return b
    }

    function createImageWithSrc(src) {
        const e = document.createElement('img')
        e.src = src
        return e
    }

    function createSongInformation(div) {
        div.appendChild(createImageWithSrc('./static/img/img.png'))
        inputElements.forEach(x => {
            div.appendChild(createElementWithTextContent(x.name === 'date' ? 'h3' : 'h2', `${x.name.charAt(0).toUpperCase() + x.name.slice(1)}: ${x.value}`))
        })
        return div
    }

    addBtn.addEventListener('click', () => {
        if (!correctInput()) {
            return
        }

        const div = createSongInformation(createElementWithClass('div', 'hits-info'))

        div.appendChild(createButtonWithClassAndTextContent('button', 'Save song', 'save-btn'))
        div.appendChild(createButtonWithClassAndTextContent('button', 'Like song', 'like-btn'))
        div.appendChild(createButtonWithClassAndTextContent('button', 'Delete', 'delete-btn'))
        allHits.appendChild(div)
        clearInputFields()


        const allButtons = Array.from(document.querySelectorAll('button'))

        allButtons.forEach(x => {
            x.addEventListener('click', (event) => {
                if (x.textContent === 'Save song') {
                    const div = x.parentElement
                    const savedContainer = document.querySelector('.saved-container')

                    const saveBtnToRemove = div.querySelector('.save-btn')
                    const likeBtnToRemove = div.querySelector('.like-btn')

                    div.removeChild(saveBtnToRemove)
                    div.removeChild(likeBtnToRemove)

                    savedContainer.appendChild(div)
                    allHits.removeChild(div)

                } else if (x.textContent === 'Like song' && !x.disabled) {
                    console.log(likes.textContent)
                    const [text, counter] = likes.textContent.split(': ')
                    likes.textContent = `${text}: ${Number(counter) + 1}`
                    x.disabled = true

                } else if (x.textContent === 'Delete') {
                    const div = x.parentElement
                    div.parentElement.removeChild(div)
                }
            })
        })
    })
}