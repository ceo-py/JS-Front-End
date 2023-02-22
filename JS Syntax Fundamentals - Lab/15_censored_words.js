
function solve(string, word){
    let output = string.replace(new RegExp(word, 'g'), '*'.repeat(word.length));
    console.log(output)
}

solve('A small sentence with some words', 'small')


