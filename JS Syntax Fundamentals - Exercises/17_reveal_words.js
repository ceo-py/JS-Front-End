

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