function solve (numOne, numTwo, operator) {
    let result = {
        '*': numOne * numTwo,
        '/': numOne / numTwo,
        '**': numOne ** numTwo,
        '+': numOne + numTwo,
        '-': numOne - numTwo,
        '%': numOne % numTwo,
    }
    console.log(result[operator])
}

solve(3, 5.5, '*')