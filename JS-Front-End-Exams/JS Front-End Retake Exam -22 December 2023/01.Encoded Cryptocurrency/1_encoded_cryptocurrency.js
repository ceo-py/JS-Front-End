function encodedCryptocurrency(list) {
    let initialMessage = list.shift()
    let command = list.shift()
    const commands = {
        TakeEven: () => {
            initialMessage = Array.from(initialMessage).filter((x, i) => i % 2 === 0).join('')
        }, ChangeAll: (substring, replacement) => {
            initialMessage = initialMessage.replace(new RegExp(substring, 'g'), replacement)
        }, Reverse: (substring) => {
            if (!initialMessage.includes(substring)) return "error"
            initialMessage = initialMessage.replace(substring, '')
            initialMessage += substring.split('').reverse().join('')
            /*
            6 more reverse methods
            let reversedString = '';
            for (let i = substring.length - 1; i >= 0; i--) {
                reversedString += substring[i];
            }
            ========
            const reversedString = Array.from(substring).reverse().join('');
            ========
            const reversedString = [...substring].reverse().join('');
            ========
            function reverseString(str) {
                if (str === '') {
                    return str;
                } else {
                    return reverseString(str.substr(1)) + str[0];
                }
            }
            const reversedString = reverseString(substring);
            ========
            const reversedString = substring.split('').reduce((acc, char) => char + acc, '');
             */
        }
    }

    while (command !== 'Buy') {
        const [getCommand, ...data] = command.split('?')
        console.log(commands[getCommand](...data)? 'error' : initialMessage)
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

encodedCryptocurrency(["PZDfA2PkAsakhnefZ7aZ", "TakeEven", "TakeEven", "TakeEven", "ChangeAll?Z?X", "ChangeAll?A?R", "Reverse?PRX", "Buy"])
