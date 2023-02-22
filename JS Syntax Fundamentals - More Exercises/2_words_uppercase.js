function solve(string) {
    const words = string.match(/\b\w+\b/g) || [];
    const upperCaseWords = words.map(word => word.toUpperCase());
    console.log(upperCaseWords.join(', '));

    // string = string.split(' ')
    // let output = []
    // for (const word of string) {
    //     let foundWord = ''
    //     for (const letter of word) {
    //         if (letter.toUpperCase() !== letter.toLowerCase()) {
    //             foundWord += letter.toUpperCase()
    //         } else {
    //             output.push(foundWord)
    //             foundWord = ''
    //         }
    //     }
    //     if (foundWord) {
    //         output.push(foundWord)
    //     }
    // }
    // console.log(output.join(', '))
}


solve('Functions in JS can be nested, i.e. hold other functions')