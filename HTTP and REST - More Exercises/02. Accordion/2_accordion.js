async function solution() {
    const articlesAPI = 'http://localhost:3030/jsonstore/advanced/articles/list'
    const detailsAPI = 'http://localhost:3030/jsonstore/advanced/articles/details/'
    const main = document.querySelector('#main')
    
    const getDataAPI = async () => {
        const data = await fetch(articlesAPI)
        return await data.json()
    }
    
    const createElement = async (spanContent, idContent) => {
        const div = document.createElement('div')
        div.classList.add('accordion')
        const divHead = document.createElement('div')
        divHead.classList.add('head')
        const span = document.createElement('span')
        span.textContent = spanContent
        const button = document.createElement('button')
        button.textContent = 'More'
        button.classList.add('button')
        button.setAttribute('id', idContent)
        button.addEventListener('click', await moreFunctionality)
        divHead.appendChild(span)
        divHead.appendChild(button)
        div.appendChild(divHead)
        
        const divExtra = document.createElement('div')
        divExtra.classList.add('extra')
        div.appendChild(divExtra)
        
        return div
    }
    
    const moreFunctionality = async () => {
        const currentElement = event.target
        const extra = currentElement.parentElement.parentElement.querySelector('.extra')
        let data = await fetch(`${detailsAPI}${currentElement.id}`)
        data = await data.json()
        
        if (currentElement.textContent === 'More') {
            const p = document.createElement('p')
            p.textContent = data.content
            extra.appendChild(p)
            extra.style.display = 'inline-block'
            currentElement.textContent = 'Less'
            
        } else {
            currentElement.textContent = 'More'
            extra.style.display = 'none'
        }
    }
    
    
    const loadDataToHtml = async (data, main) => {
        for (const key in data) {
            main.appendChild(await createElement(data[key].title, data[key]._id))
        }
    }

    await loadDataToHtml(await getDataAPI(), main)
}


solution()