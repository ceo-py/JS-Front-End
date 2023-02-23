function solve(...list) {
    const person = {
        name: list.shift(), lastName: list.shift(), hairColor: list.shift()
    }
    console.log(JSON.stringify(person))
}


solve('George', 'Jones', 'Brown')