function shoppingList(list) {
    let cart = list.shift().split('!')

    function removeItem (item) {
        cart.splice(cart.indexOf(item), 1)
    }

    list.forEach((x) => {
        let [command, item, newItem] = x.split(' ')

        if (command === 'Urgent') {

            if (!cart.includes(item)) {
                cart.unshift(item)
            }

        } else if (command === 'Unnecessary') {

            if (cart.includes(item)) {
                removeItem(item)
            }
        } else if (command === 'Correct') {

            if (cart.includes(item)) {
                cart[cart.indexOf(item)] = newItem
            }
        } else if (command === 'Rearrange') {

            if (cart.includes(item)) {
                removeItem(item)
                cart.push(item)
            }
        } else {
            console.log(`${cart.join(', ')}`)
        }
    })
}

shoppingList(["Milk!Pepper!Salt!Water!Banana",
"Urgent Salt",
"Unnecessary Grapes",
"Correct Pepper Onion",
"Rearrange Milk",
"Correct Milk Promqna",
"Correct Tomatoes Potatoes",
"Go Shopping!"])

