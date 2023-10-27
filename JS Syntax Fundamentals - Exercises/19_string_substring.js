function solve(wordCheck, string){
    console.log(string.split(' ').find(w => w.toLowerCase() === wordCheck.toLowerCase()) ? wordCheck : `${wordCheck} not found!`)
}



// function solve(wordCheck, string){
//     string = string.split(' ')
//     let output = `${wordCheck} not found!`
//     for (let word of string){
//         word = word.toLowerCase()
//         if (word === wordCheck.toLowerCase()){
//             output = word
//             break
//         }
//     }
//     console.log(output)
// }


solve('javascript',
'JavaScript is the best programming language')