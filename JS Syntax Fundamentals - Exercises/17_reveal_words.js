

function solve(words, string){
    words = words.split(', ')
    string = string.split(' ')
    for (let i=0; i < string.length; i++){
        for (const word of words){
            if (string[i][0] === '*' && string[i].length === word.length){
                string[i] = word
            }
        }
    }
    console.log(string.join(' '))
}


solve('great', 'softuni is ***** place for learning new programming languages')




// function solve(words, string){
//     const wordList = words.split(', ')
//     const wordMap = new Map(wordList.map(word => [word.length, word]))
//
//     const result = string.split(' ').map(word => {
//         if (word[0] === '*' && wordMap.has(word.length)) {
//             return wordMap.get(word.length)
//         }
//         return word
//     })
//
//     console.log(result.join(' '))
// }
