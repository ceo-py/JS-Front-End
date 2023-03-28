function shoppingList(list) {
    const cart = list.shift().split('!')
    const removeItem = (item) => cart.splice(cart.indexOf(item), 1)
    const commands = {
        Urgent: (item) => !cart.includes(item) ? cart.unshift(item) : null,
        Unnecessary: (item) => cart.includes(item) ? removeItem(item) : null,
        Correct: (item, newItem) => cart.includes(item) ? cart[cart.indexOf(item)] = newItem : null,
        Rearrange: (item) => cart.includes(item) && (removeItem(item), cart.push(item)),
        'Go': (_) => console.log(cart.join(', '))}
    list.forEach((x) => {const [command, ...items] = x.split(' '); commands[command](...items);})
}





// function shoppingList(list) {
//     const cart = list.shift().split('!')
//     list.pop()
//
//     const removeItem = (item) => cart.splice(cart.indexOf(item), 1)
//
//     const Urgent = (item) => !cart.includes(item) ? cart.unshift(item) : null
//
//     const Unnecessary = (item) => cart.includes(item) ? removeItem(item): null
//
//     const Correct = (item, newItem) => cart.includes(item) ? cart[cart.indexOf(item)] = newItem : null
//
//     const Rearrange = (item) => cart.includes(item) && (removeItem(item), cart.push(item))
//
//     const commands = {Urgent, Unnecessary, Correct, Rearrange}
//
//     list.forEach((x) => {const [command, ...items] = x.split(' '); commands[command](...items);})
//
//      console.log(`${cart.join(', ')}`)
// }





// function shoppingList(list) {
//     let cart = list.shift().split('!')
//
//     function removeItem (item) {
//         cart.splice(cart.indexOf(item), 1)
//     }
//
//     list.forEach((x) => {
//         let [command, item, newItem] = x.split(' ')
//
//         if (command === 'Urgent') {
//
//             if (!cart.includes(item)) {
//                 cart.unshift(item)
//             }
//
//         } else if (command === 'Unnecessary') {
//
//             if (cart.includes(item)) {
//                 removeItem(item)
//             }
//         } else if (command === 'Correct') {
//
//             if (cart.includes(item)) {
//                 cart[cart.indexOf(item)] = newItem
//             }
//         } else if (command === 'Rearrange') {
//
//             if (cart.includes(item)) {
//                 removeItem(item)
//                 cart.push(item)
//             }
//         } else {
//             console.log(`${cart.join(', ')}`)
//         }
//     })
// }

shoppingList(["Milk!Pepper!Salt!Water!Banana",
    "Urgent Salt",
    "Unnecessary Grapes",
    "Correct Pepper Onion",
    "Rearrange Milk",
    "Correct Milk Promqna",
    "Correct Tomatoes Potatoes",
    "Go Shopping!"])

