function solve (numOne, numTwo, operator) {

    console.log(eval(`${numOne} ${operator} ${numTwo}`))
}



// function solve (numOne, numTwo, operator) {
//     const result = {
//         '*': numOne * numTwo,
//         '/': numOne / numTwo,
//         '**': numOne ** numTwo,
//         '+': numOne + numTwo,
//         '-': numOne - numTwo,
//         '%': numOne % numTwo,
//     }
//     console.log(result[operator])
// }

solve(3, 5.5, '*')