function solve(name, lastName, hairColor) {
    const person = {
        name,
        lastName,
        hairColor
    }
    console.log(JSON.stringify(person))
}


// function solve(...list) {
//     const person = {
//         name: list.shift(), lastName: list.shift(), hairColor: list.shift()
//     }
//     console.log(JSON.stringify(person))
// }


solve('George', 'Jones', 'Brown')