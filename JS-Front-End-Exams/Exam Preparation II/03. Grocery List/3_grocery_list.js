function solve() {
    const API_URL = 'http://localhost:3030/jsonstore/grocery/'
    const inputFields = {
        name: document.querySelector('#product'),
        count: document.querySelector('#count'),
        price: document.querySelector('#price'),
    }

    const groceryApp = {
        addBtn: document.querySelector('#add-product'),
        updateBtn: document.querySelector('#update-product'),
        loadAllBtn: document.querySelector('#load-product'),
        list: document.querySelector('#tbody'),
    }

    let editId = null


    const createElement = ({
                               tag,
                               textContent = '',
                               value = '',
                               className = [],
                               attributes = {},
                               buttonEven = {},
                               addToEl = ''
                           }) => {
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
        if (addToEl) {
            addToEl.appendChild(e)
        } else {
            return e
        }

    }

    const clearInputFields = (dataFromInput => dataFromInput.forEach(x => x.value = ''))

    const apiRequest = async ({url = '', method = '', id = '', item = ''}) => {
        const options = {
            method: method
        }
        if (['PATCH', 'POST'].includes(method)) {
            options.headers = {'Content-Type': 'application/json'}
            options.body = JSON.stringify(item)
        }
        const data = await fetch(`${url}${id}`, options)
        return await data.json()
    }

    const updateFunctionality = async (event) => {
        const [name, count, price, _] = Array.from(event.currentTarget.parentElement.parentElement.querySelectorAll('td'))
        inputFields.name.value = name.textContent
        inputFields.count.value = count.textContent
        inputFields.price.value = price.textContent
        editId = event.currentTarget.parentElement.id
        groceryApp.addBtn.disabled = true
        groceryApp.updateBtn.disabled = false
    }

    const deleteFunctionality = async (event) => {
        await apiRequest({url: API_URL, id: event.currentTarget.parentElement.id, method: 'DELETE'})
        loadDataToHtml(groceryApp.list, await apiRequest({url: API_URL, method: 'GET'}))
    }

    const createProductElement = (item) => {
        const tr = createElement({tag: 'tr'})
        createElement({tag: 'td', className: ['name'], textContent: item.product, addToEl: tr})
        createElement({tag: 'td', className: ['count-product'], textContent: item.count, addToEl: tr})
        createElement({tag: 'td', className: ['product-price'], textContent: item.price, addToEl: tr})
        const td = createElement({tag: 'td', className: ['btn'], attributes: {id: item._id}})
        createElement({
            tag: 'button',
            className: ['update'],
            textContent: 'Update',
            buttonEven: {click: updateFunctionality},
            addToEl: td
        })
        createElement({
            tag: 'button',
            className: ['delete'],
            textContent: 'Delete',
            buttonEven: {click: deleteFunctionality},
            addToEl: td
        })
        tr.appendChild(td)
        return tr
    }

    const loadDataToHtml = (el, data) => {
        el.innerHTML = ''
        for (const [_, value] of Object.entries(data)) {
            el.appendChild(createProductElement(value))
        }
    }

    const addBtnFunctionality = async (event) => {
        event.preventDefault()

        await apiRequest({
            url: API_URL,
            method: 'POST',
            item: {
                product: inputFields.name.value,
                count: inputFields.count.value,
                price: inputFields.price.value,
            }
        })
        loadDataToHtml(groceryApp.list,
            await apiRequest({
                url: API_URL,
                method: 'GET'
            }))
        clearInputFields(Object.values(inputFields))
    }

    const updateBtnFunctionality = async (event) => {
        event.preventDefault()
        await apiRequest({
            url: API_URL,
            method: 'PATCH',
            id: editId,
            item: {
                product: inputFields.name.value,
                count: inputFields.count.value,
                price: inputFields.price.value,
            }
        })
        loadDataToHtml(groceryApp.list, await apiRequest({url: API_URL, method: 'GET'}))
        groceryApp.addBtn.disabled = false
        groceryApp.updateBtn.disabled = true
        clearInputFields(Object.values(inputFields))
    }

    const loadAllBtnFunctionality = async (event) => {
        event.preventDefault()
        loadDataToHtml(groceryApp.list, await apiRequest({url: API_URL, method: 'GET'}))
    }


    groceryApp.addBtn.addEventListener('click', addBtnFunctionality)
    groceryApp.updateBtn.addEventListener('click', updateBtnFunctionality)
    groceryApp.loadAllBtn.addEventListener('click', loadAllBtnFunctionality)
}


solve()













// async function attachEvents() {
//     const API_URL = 'http://localhost:3030/jsonstore/grocery/'
//     const product = document.querySelector('#product')
//     const count = document.querySelector('#count')
//     const price = document.querySelector('#price')
//
//     const addProduct = document.querySelector('#add-product')
//     const updateProduct = document.querySelector('#update-product')
//     const loadProduct = document.querySelector('#load-product')
//
//     const tbody = document.querySelector('#tbody')
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
//     const updateBtnFunctionality = () => {
//         const e = event.target
//         updateBtnId = e.id
//
//         product.value = e.parentElement.parentElement.querySelector('.name').textContent
//         count.value = e.parentElement.parentElement.querySelector('.count-product').textContent
//         price.value = e.parentElement.parentElement.querySelector('.product-price').textContent
//
//         addProduct.disabled = true
//         updateProduct.disabled = false
//     }
//
//     const deleteBtnFunctionality = async () => {
//         const e = event.target
//
//         await fetch(`${API_URL}${e.id}`, {
//             method: 'DELETE'
//         })
//         await loadDataToHTML(await loadDataFromApi())
//     }
//
//     const createTaskElement = (data) => {
//         const tr = createElement('tr')
//
//         tr.appendChild(createElement('td', data.product, '', ['name']))
//         tr.appendChild(createElement('td', data.count, '', ['count-product']))
//         tr.appendChild(createElement('td', data.price, '', ['product-price']))
//
//         const td = createElement('td', '', '', ['btn'])
//
//         const updateBtn = createElement('button', 'Update', '', ['update'], {id: data._id})
//         updateBtn.addEventListener('click', updateBtnFunctionality)
//
//         const deleteBtn = createElement('button', 'Delete', '', ['delete'], {id: data._id})
//         deleteBtn.addEventListener('click', deleteBtnFunctionality)
//
//         td.appendChild(updateBtn)
//         td.appendChild(deleteBtn)
//
//         tr.appendChild(td)
//
//         return tr
//
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
//         await loadDataToHTML(await loadDataFromApi())
//         resetInput([product, count, price])
//
//         addProduct.disabled = false
//         updateProduct.disabled = true
//     }
//
//
//     loadProduct.addEventListener('click', loadProductFunctionality)
//     addProduct.addEventListener('click', addProductFunctionality)
//     updateProduct.addEventListener('click', updateProductFunctionality)
//
// }
//
// attachEvents()












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