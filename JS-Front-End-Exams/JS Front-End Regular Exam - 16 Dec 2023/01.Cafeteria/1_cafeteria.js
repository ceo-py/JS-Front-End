function cafeteria(list) {
    const cafe = {}
    const initialInput = list.shift()

    const cafeCommands = {
        Prepare: (name, shift, type) => {
            try {
                if (cafe[name][shift].includes(type)) return `${name} has prepared a ${type} for you!`
            } catch {

            }
            return `${name} is not available to prepare a ${type}.`
        },
        "Change Shift": (name, shift) => {
            const oldShiftMenu = Object.values(cafe[name])
            cafe[name] = {[shift]: oldShiftMenu}
            return `${name} has updated his shift to: ${shift}`
        },
        Learn: (name, type) => {
            if (Object.values(cafe[name]).includes(type)) {
                return `${name} knows how to make ${type}.`
            }
            Object.values(cafe[name]).map(x => x.push(type))
            return `${name} has learned a new coffee type: ${type}.`
        }

    }

    let input = list.shift()
    while (input !== 'Closed') {
        if (!input.includes('/')) {
            const [name, shift, coffee] = input.split(' ')
            cafe[name] = {[shift]: coffee.split(',')}
        } else {
            const [command, ...values] = input.split(' / ')
            console.log(cafeCommands[command](...values))
        }
        input = list.shift()
    }
    console.log(cafe)
}

cafeteria(['3', 'Alice day Espresso,Cappuccino', 'Bob night Latte,Mocha', 'Carol day Americano,Mocha', 'Prepare / Alice / day / Espresso', 'Change Shift / Bob / night', 'Learn / Carol / Latte', 'Learn / Bob / Latte', 'Prepare / Bob / night / Latte', 'Closed'])