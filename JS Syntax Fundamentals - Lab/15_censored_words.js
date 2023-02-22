
function solve(string, word){
    console.log(string.replace(new RegExp(word, 'g'), '*'.repeat(word.length)))
}

solve('A small sentence with some words', 'small')


