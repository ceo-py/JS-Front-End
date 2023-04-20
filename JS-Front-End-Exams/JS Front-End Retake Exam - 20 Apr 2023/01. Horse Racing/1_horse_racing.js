function horseRace(list) {
    const horses = list.shift().split('|')

    const findHorsePos = (horse) => {
        return horses.findIndex((x) => x === horse)
    }

    const horseSwap = (firstHorseIndex, secondHorseIndex) => {
        [horses[firstHorseIndex], horses[secondHorseIndex]] = [horses[secondHorseIndex], horses[firstHorseIndex]]
    }

    for (const index in list) {
        const [command, overtakingOrName, overtakenOrName] = list[index].split(' ')
        if (command === 'Finish') break
        if (command === 'Retake') {
            const firstHorse = findHorsePos(overtakingOrName)
            const secondHorse = findHorsePos(overtakenOrName)
            if (firstHorse >= 0 && secondHorse > 0 && firstHorse < secondHorse) {
                horseSwap(firstHorse, secondHorse)
                console.log(`${overtakingOrName} retakes ${overtakenOrName}.`)
            }
        } else if (command === 'Trouble') {
            const horse = findHorsePos(overtakingOrName)
            if (horse > 0) {
                horseSwap(horse - 1, horse)
                console.log(`Trouble for ${overtakingOrName} - drops one position.`)
            }
        } else if (command === 'Rage') {
            const horse = findHorsePos(overtakingOrName)
            horses.splice(horse, 1)
            horses.splice(horse + 2, 0, overtakingOrName)
            console.log(`${overtakingOrName} rages 2 positions ahead.`)


        } else if (command === 'Miracle') {
            horses.push(horses.shift())
            console.log(`What a miracle - ${horses[horses.length - 1]} becomes first.`)
        }
    }
    console.log(horses.join('->'))
    console.log(`The winner is: ${horses.pop()}`)
}



horseRace(['Onyx|Domino|Sugar|Fiona',
    'Trouble Onyx',
    'Retake Onyx Sugar',
    'Rage Domino',
    'Miracle',
    'Finish'])

// horseRace(['Onyx|Domino|Sugar|Fiona',
// 'Trouble Onyx',
// 'Retake Onyx Sugar',
// 'Rage Domino',
// 'Miracle',
// 'Finish'])

// horseRace(['Fancy|Lilly',
// 'Retake Lilly Fancy',
// 'Trouble Lilly',
// 'Trouble Lilly',
// 'Finish',
// 'Rage Lilly'])