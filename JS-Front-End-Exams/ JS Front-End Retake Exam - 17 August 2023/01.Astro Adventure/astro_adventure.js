function astroAdventure(list) {
    const astronautsCounter = Number(list.shift())
    const astronauts = {}

    const commands = {
        Explore: (name, energyNeeded) => {
            if (astronauts[name].energy >= energyNeeded) {
                astronauts[name].energy -= energyNeeded
                console.log(`${name} has successfully explored a new area and now has ${astronauts[name].energy} energy!`)
            } else console.log(`${name} does not have enough energy to explore!`)
        },
        Refuel: (name, amount) => {
            if (astronauts[name].energy + amount > 200) amount = 200 - astronauts[name].energy
            astronauts[name].energy += amount
            console.log(`${name} refueled their energy by ${amount}!`)
        },
        Breathe: (name, amount) => {
            if (astronauts[name].oxygen + amount > 100) amount = 100 - astronauts[name].oxygen
            astronauts[name].oxygen += amount
            console.log(`${name} took a breath and recovered ${amount} oxygen!`)
        }
    }

    for (let i = 0; i < astronautsCounter; i += 1) {
        const [name, oxygen, energy] = list.shift().split(' ').map(x => isNaN(x) ? x : Number(x))
        astronauts[name] = {
            name, oxygen, energy
        }
    }

    let dataRow = list.shift()
    while (dataRow !== 'End') {
        const [command, ...data] = dataRow.split(' - ').map(x => isNaN(x)? x : Number(x))
        commands[command](...data)
        dataRow = list.shift()
    }
    Object.values(astronauts).forEach(x => console.log(`Astronaut: ${x.name}, Oxygen: ${x.oxygen}, Energy: ${x.energy}`))
}

astroAdventure(['3', 'John 50 120', 'Kate 80 180', 'Rob 70 150', 'Explore - John - 50', 'Refuel - Kate - 30', 'Breathe - Rob - 20', 'End'])