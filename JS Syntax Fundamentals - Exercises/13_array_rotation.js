function solve (list, rotation) {
    console.log(list.splice(rotation > list.length? rotation % list.length: rotation).concat(list).join(' '))
}

// function solve (list, rotation) {
//     for (let i = 0; i < rotation; i++){
//         list.push(list.shift())
//     }
//     console.log(list.join(' '))
// }


solve([2, 4, 15, 31], 5)