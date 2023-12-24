function encodedCryptocurrency(list) {
    let initialMessage = list.shift()
    let command = list.shift()
    const commands = {
        TakeEven: () => {
            initialMessage = Array.from(initialMessage).filter((x, i) => i % 2 === 0).join('')
            return initialMessage
        },
        ChangeAll: (substring, replacement) => {
            initialMessage = initialMessage.replace(new RegExp(substring, 'g'), replacement)
            return initialMessage
        },
        Reverse: (substring) => {
            if (!initialMessage.includes(substring)) return "error"
            initialMessage = initialMessage.replace(substring, '')
            initialMessage += substring.split('').reverse().join('')
            return initialMessage
        }
    }

    while (command !== 'Buy') {
        const [getCommand, ...data] = command.split('?')
        console.log(commands[getCommand](...data))
        command = list.shift()
    }
    console.log(`The cryptocurrency is: ${initialMessage}`)
}

// encodedCryptocurrency(["z2tdsfndoctsB6z7tjc8ojzdngzhtjsyVjek!snfzsafhscs",
// "TakeEven",
// "Reverse?!nzahc",
// "ChangeAll?m?g",
// "Reverse?adshk",
// "ChangeAll?z?i",
// "Buy"])

encodedCryptocurrency(["PZDfA2PkAsakhnefZ7aZ",
"TakeEven",
"TakeEven",
"TakeEven",
"ChangeAll?Z?X",
"ChangeAll?A?R",
"Reverse?PRX",
"Buy"])
