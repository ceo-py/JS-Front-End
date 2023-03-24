async function attachEvents() {
    const API_URL = 'http://localhost:3030/jsonstore/grocery/'
    const product = document.querySelector('#product')
    const count = document.querySelector('#count')
    const price = document.querySelector('#price')

    const addProduct = document.querySelector('#add-product')
    const updateProduct = document.querySelector('#update-product')
    const loadProduct = document.querySelector('#load-product')

    const tbody = document.querySelector('#tbody')
    let updateBtnId = null


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

    const resetInput = (data) => {
        data.forEach(x => x.value = '')
    }

    const loadDataFromApi = async () => {
        const data = await fetch(API_URL)
        return await data.json()
    }

    const updateBtnFunctionality = () => {
        const e = event.target
        updateBtnId = e.id

        product.value = e.parentElement.parentElement.querySelector('.name').textContent
        count.value = e.parentElement.parentElement.querySelector('.count-product').textContent
        price.value = e.parentElement.parentElement.querySelector('.product-price').textContent

        addProduct.disabled = true
        updateProduct.disabled = false
    }

    const deleteBtnFunctionality = async () => {
        const e = event.target

        await fetch(`${API_URL}${e.id}`, {
            method: 'DELETE'
        })
        await loadDataToHTML(await loadDataFromApi())
    }

    const createTaskElement = (data) => {
        const tr = createElement('tr')

        tr.appendChild(createElement('td', data.product, '', ['name']))
        tr.appendChild(createElement('td', data.count, '', ['count-product']))
        tr.appendChild(createElement('td', data.price, '', ['product-price']))

        const td = createElement('td', '', '', ['btn'])

        const updateBtn = createElement('button', 'Update', '', ['update'], {id: data._id})
        updateBtn.addEventListener('click', updateBtnFunctionality)

        const deleteBtn = createElement('button', 'Delete', '', ['delete'], {id: data._id})
        deleteBtn.addEventListener('click', deleteBtnFunctionality)

        td.appendChild(updateBtn)
        td.appendChild(deleteBtn)

        tr.appendChild(td)

        return tr

    }

    const loadDataToHTML = async (data) => {
        tbody.innerHTML = ''

        for (const key in data) {
            tbody.appendChild(await createTaskElement(data[key]))
        }

    }

    const loadProductFunctionality = async () => {
        event.preventDefault()
        await loadDataToHTML(await loadDataFromApi())
    }

    const createItemForAPiDb = (product, count, price) => {
        return {
            product, count, price
        }
    }

    const addProductFunctionality = async () => {
        event.preventDefault()

        await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(createItemForAPiDb(product.value, count.value, price.value))
        })
        await loadDataToHTML(await loadDataFromApi())
        resetInput([product, count, price])
    }

    const updateProductFunctionality = async () => {

        await fetch(`${API_URL}${updateBtnId}`, {
            method: 'PATCH',
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify(createItemForAPiDb(product.value, count.value, price.value))
        })
        await loadDataToHTML(await loadDataFromApi())
        resetInput([product, count, price])

        addProduct.disabled = false
        updateProduct.disabled = true
    }


    loadProduct.addEventListener('click', loadProductFunctionality)
    addProduct.addEventListener('click', addProductFunctionality)
    updateProduct.addEventListener('click', updateProductFunctionality)

}

attachEvents()












// function attachEvents() {
//     const API_URL = 'http://localhost:3030/jsonstore/grocery/'
//     const addProduct = document.querySelector('#add-product')
//     const tbody = document.querySelector('#tbody')
//     const updateProduct = document.querySelector('#update-product')
//     const loadProduct = document.querySelector('#load-product')
//     const product = document.querySelector('#product')
//     const count = document.querySelector('#count')
//     const price = document.querySelector('#price')
//     let updateBtnId = null
//
//
//     const createElement = (tag, textContent, value, className, attributes) => {
//         const e = document.createElement(tag)
//
//         if (textContent) {
//             e.textContent = textContent
//         }
//
//         if (value) {
//             e.value = value
//         }
//
//         if (className) {
//             className.forEach(x => e.classList.add(x))
//         }
//
//         if (attributes) {
//             for (const key in attributes) {
//                 e.setAttribute(key, attributes[key])
//             }
//         }
//         return e
//     }
//
//     const resetInput = (data) => {
//         data.forEach(x => x.value = '')
//     }
//
//     const loadDataFromApi = async () => {
//         const data = await fetch(API_URL)
//         return await data.json()
//     }
//
//     const updateBtnFunctionality = async () => {
//         const e = event.target.parentElement.parentElement
//
//         product.value = e.querySelector('.name').textContent
//         count.value = e.querySelector('.count-product').textContent
//         price.value = e.querySelector('.product-price').textContent
//
//         updateBtnId = event.target.id
//         updateProduct.disabled = false
//         addProduct.disabled = true
//     }
//
//     const deleteBtnFunctionality = async () => {
//         const e = event.target
//
//         await fetch(`${API_URL}${e.id}`, {
//             method: 'DELETE'
//         })
//
//         await loadDataToHTML(await loadDataFromApi())
//     }
//
//     const createTaskElement = async (data) => {
//         const tr = createElement('tr')
//
//         tr.appendChild(createElement('td', data.product, '', ['name']))
//         tr.appendChild(createElement('td', data.count, '', ['count-product']))
//         tr.appendChild(createElement('td', data.price, '', ['product-price']))
//
//         const td = createElement('td', '', '', ['btn'])
//
//         const updateBtn = createElement('button', 'Update', '', ['update'], {id: data._id})
//         updateBtn.addEventListener('click', await updateBtnFunctionality)
//
//         const deleteBtn = createElement('button', 'Delete', '', ['delete'], {id: data._id})
//         deleteBtn.addEventListener('click', await deleteBtnFunctionality)
//
//         td.appendChild(updateBtn)
//         td.appendChild(deleteBtn)
//
//         tr.appendChild(td)
//
//         return tr
//     }
//
//     const loadDataToHTML = async (data) => {
//         tbody.innerHTML = ''
//
//         for (const key in data) {
//             tbody.appendChild(await createTaskElement(data[key]))
//         }
//
//     }
//
//     const loadProductFunctionality = async () => {
//         event.preventDefault()
//         await loadDataToHTML(await loadDataFromApi())
//     }
//
//     const createItemForAPiDb = (product, count, price) => {
//         return {
//             product, count, price
//         }
//     }
//
//     const addProductFunctionality = async () => {
//         event.preventDefault()
//
//         await fetch(API_URL, {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(createItemForAPiDb(product.value, count.value, price.value))
//         })
//         await loadDataToHTML(await loadDataFromApi())
//         resetInput([product, count, price])
//     }
//
//     const updateProductFunctionality = async () => {
//
//         await fetch(`${API_URL}${updateBtnId}`, {
//             method: 'PATCH',
//             header: {'Content-Type': 'application/json'},
//             body: JSON.stringify(createItemForAPiDb(product.value, count.value, price.value))
//         })
//
//         await loadDataToHTML(await loadDataFromApi())
//         resetInput([product, count, price])
//         updateProduct.disabled = true
//         addProduct.disabled = false
//     }
//
//     loadProduct.addEventListener('click', loadProductFunctionality)
//     addProduct.addEventListener('click', addProductFunctionality)
//     updateProduct.addEventListener('click', updateProductFunctionality)
//
//
// }
//
//
// attachEvents();