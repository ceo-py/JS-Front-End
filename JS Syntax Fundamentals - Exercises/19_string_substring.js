

function solve(wordCheck, string){
    string = string.split(' ')
    let output = `${wordCheck} not found!`
    for (let word of string){
        word = word.toLowerCase()
        if (word === wordCheck.toLowerCase()){
            output = word
            break
        }
    }
    console.log(output)
}


solve('javascript',
'JavaScript is the best programming language')