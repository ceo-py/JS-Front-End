function addItem() {
    const newItemText = document.querySelector('#newItemText')
    const newItemValue = document.querySelector('#newItemValue')
    document.querySelector('#menu').innerHTML += `<option value="${newItemValue.value}">${newItemText.value}</option>`
    newItemText.value = ''
    newItemValue.value = ''
}





// function addItem() {
//     const newItemText = document.querySelector('#newItemText')
//     const newItemValue = document.querySelector('#newItemValue')
//     const menu = document.querySelector('#menu')
//
//     const option = document.createElement('option')
//     option.textContent = newItemText.value
//     option.value = newItemValue.value
//     menu.appendChild(option)
//     newItemText.value = ''
//     newItemValue.value = ''
// }


