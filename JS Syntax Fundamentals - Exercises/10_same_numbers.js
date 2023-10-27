function solve(numbers) {
    const strNumbers = Array.from(numbers.toString())
    const sum = eval(strNumbers.join('+'))
    console.log(`${Array.from(strNumbers.filter((x) => x === strNumbers[0])).length === strNumbers.length}\n${sum}`)
}


// function solve(number) {
//     number = number.toString()
//     let numberIs = number[0]
//     let equalNumbers = ""
//     let sumNumbers = 0
//
//     for (let i = 0; i < number.length; i++) {
//         if (numberIs === number[i]){
//             equalNumbers += "1"
//         }
//         sumNumbers += parseInt(number[i])
//     }
//     if (equalNumbers.length === number.length){
//         console.log(`true\n${sumNumbers}`)
//     } else {
//         console.log(`false\n${sumNumbers}`)
//     }
// }


solve(2222222)