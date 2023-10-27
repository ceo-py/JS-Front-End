function solve(list){
    list.map(x => console.log(`${x.toString() === x.toString().split("").reverse().join("")}`))
}


// function solve(list){
//     for (let number of list){
//         number = number.toString()
//         console.log(`${number === number.split("").reverse().join("")}`)
//     }
// }


solve([123,323,421,121])