function solve(string){
    string.split(' ').forEach(w => w.match(/#[A-Za-z]/)? console.log(w.slice(1, w.length)): null)
}



// function solve(string){
//     string = string.split(' ')
//     function onlyLettersAndNumbers(str) {
//   return Boolean(str.match(/#[A-Za-z]/));
//     }
//     for (const word of string){
//         if (onlyLettersAndNumbers(word)){
//             console.log(word.slice(1, word.length))
//         }
//     }
// }


solve('Nowadays everyone uses # to tag a #special word in #socialMedia #')