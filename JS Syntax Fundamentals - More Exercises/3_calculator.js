function solve (numOne, operator, numTwo) {
    console.log(eval(`${numOne}${operator}${numTwo}`).toFixed(2))
}


// function solve (numOne, operator, numTwo) {
//     let result = {
//         '*': numOne * numTwo,
//         '/': numOne / numTwo,
//         '+': numOne + numTwo,
//         '-': numOne - numTwo,
//     }
//     console.log(result[operator].toFixed(2))
// }

solve(5,
'+',
10
)

