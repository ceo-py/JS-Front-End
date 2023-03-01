function addItem() {
    const newItemText = document.querySelector('#newItemText')
    const newItemValue = document.querySelector('#newItemValue')
    const menu = document.querySelector('#menu')

    const option = document.createElement('option')
    option.textContent = newItemText.value
    option.value = newItemValue.value
    menu.appendChild(option)
    newItemText.value = ''
    newItemValue.value = ''
}


