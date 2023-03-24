async function solution() {
    const API_URL = 'http://localhost:3030/jsonstore/advanced/articles/list'
    const API_URL_DETAILS = 'http://localhost:3030/jsonstore/advanced/articles/details/'
    const main = document.querySelector('#main')


    const loadDataFromApi = async () => {
        const data = await fetch(API_URL)
        return await data.json()
    }

    const loadDetailsFromApi = async (id) => {
        const data = await fetch(`${API_URL_DETAILS}${id}`)
        return await data.json()
    }

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

    const btnShowMoreFunctionality = () => {
        const btn = event.target
        const hideInfo = btn.parentElement.parentElement.querySelector('.extra')


        if (btn.textContent === 'More') {
            hideInfo.style.display = 'inline-block'
            btn.textContent = 'Less'
        } else {
            hideInfo.style.display = 'none'
            btn.textContent = 'More'
        }
    }

    const createHtmlElement = async (data) => {
        const accordion = createElement('div', '', '', ['accordion'])

        const head = createElement('div', '', '', ['head'])
        head.appendChild(createElement('span', data.title))

        const btnShowMore = createElement('button', 'More', '', ['button'], {id: data._id})
        btnShowMore.addEventListener('click', btnShowMoreFunctionality)

        head.appendChild(btnShowMore)
        const content = await loadDetailsFromApi(data._id)

        const extra = createElement('div', '', '', ['extra'])

        extra.appendChild(createElement('p', content.content))

        accordion.appendChild(head)
        accordion.appendChild(extra)
        return accordion
    }

    const loadDataToHtml = async (data) => {
        for (const key in data) {
            main.appendChild(await createHtmlElement(data[key]))
        }
    }

    await loadDataToHtml(await loadDataFromApi())
}

solution()





// async function solution() {
//     const articlesAPI = 'http://localhost:3030/jsonstore/advanced/articles/list'
//     const detailsAPI = 'http://localhost:3030/jsonstore/advanced/articles/details/'
//     const main = document.querySelector('#main')
//
//     const getDataAPI = async () => {
//         const data = await fetch(articlesAPI)
//         return await data.json()
//     }
//
//     const createElement = async (spanContent, idContent) => {
//         const div = document.createElement('div')
//         div.classList.add('accordion')
//         const divHead = document.createElement('div')
//         divHead.classList.add('head')
//         const span = document.createElement('span')
//         span.textContent = spanContent
//         const button = document.createElement('button')
//         button.textContent = 'More'
//         button.classList.add('button')
//         button.setAttribute('id', idContent)
//         button.addEventListener('click', await moreFunctionality)
//         divHead.appendChild(span)
//         divHead.appendChild(button)
//         div.appendChild(divHead)
//
//         const divExtra = document.createElement('div')
//         divExtra.classList.add('extra')
//         div.appendChild(divExtra)
//
//         return div
//     }
//
//     const moreFunctionality = async () => {
//         const currentElement = event.target
//         const extra = currentElement.parentElement.parentElement.querySelector('.extra')
//         let data = await fetch(`${detailsAPI}${currentElement.id}`)
//         data = await data.json()
//
//         if (currentElement.textContent === 'More') {
//             const p = document.createElement('p')
//             p.textContent = data.content
//             extra.appendChild(p)
//             extra.style.display = 'inline-block'
//             currentElement.textContent = 'Less'
//
//         } else {
//             currentElement.textContent = 'More'
//             extra.style.display = 'none'
//         }
//     }
//
//
//     const loadDataToHtml = async (data, main) => {
//         for (const key in data) {
//             main.appendChild(await createElement(data[key].title, data[key]._id))
//         }
//     }
//
//     await loadDataToHtml(await getDataAPI(), main)
// }
//
//
// solution()