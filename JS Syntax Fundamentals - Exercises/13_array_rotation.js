

function solve (list, rotation) {
    for (let i = 0; i < rotation; i++){
        list.push(list.shift())
    }
    console.log(list.join(' '))
}


solve([51, 47, 32, 61, 21], 2)