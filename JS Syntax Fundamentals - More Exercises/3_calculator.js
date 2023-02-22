function solve (numOne, operator, numTwo) {
    let result = {
        '*': numOne * numTwo,
        '/': numOne / numTwo,
        '+': numOne + numTwo,
        '-': numOne - numTwo,
    }
    console.log(result[operator].toFixed(2))
}

solve(5,
'+',
10
)