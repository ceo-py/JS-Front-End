window.addEventListener('load', solve);

function solve() {
    const inputElements = Array.from(document.querySelectorAll('input[type="text"]'))
    const addBtn = document.querySelector('#add-btn')
    const allHits = document.querySelector('.all-hits-container')

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
        const b = createElementWithClass(tag, className)
        b.textContent = textContent
        return b
    }

    function createElementImg(tag, src) {
        const i = document.createElement(tag)
        i.src = src
        return i
    }

    function createSongInformation(div) {
        div.appendChild(createElementImg('img', './static/img/img.png'))
        inputElements.forEach(x => {
            div.appendChild(createElementWithTextContent(x.name === 'date' ? 'h3' : 'h2', `${x.name.charAt(0).toUpperCase() + x.name.slice(1)}: ${x.value}`))
        })
        return div


    }

    function createBtns(div) {
        Array.from(['Save song!save-btn', 'Like song!like-btn', 'Delete!delete-btn']).forEach(x => {
            div.appendChild(createButtonWithClassAndTextContent('button', ...x.split('!')))
        })
        return div
    }

    function removeBtns(div) {
        Array.from(['.save-btn', '.like-btn']).forEach(x => {
                        div.removeChild(div.querySelector(x))
                    })
        return div
    }

    addBtn.addEventListener('click', () => {
        if (!correctInput()) {
            return
        }

        const div = createBtns(createSongInformation(createElementWithClass('div', 'hits-info')))

        allHits.appendChild(div)
        clearInputFields()

        const allButtons = Array.from(document.querySelectorAll('button'))

        allButtons.forEach(x => {
            x.addEventListener('click', (event) => {

                if (x.textContent === 'Save song') {
                    const div = removeBtns(x.parentElement)
                    const savedContainer = document.querySelector('.saved-container')

                    allHits.removeChild(div)
                    savedContainer.appendChild(div)

                } else if (x.textContent === 'Like song' && !x.disabled) {
                    const likes = document.querySelector('.likes > p')
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