
function solve(list){
    for (let number of list){
        number = number.toString()
        if (number === number.split("").reverse().join("")){
            console.log('true')
        } else {
            console.log('false')
        }
    }
}


solve([123,323,421,121])