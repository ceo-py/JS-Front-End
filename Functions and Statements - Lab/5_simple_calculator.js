function solve(numOne, numTwo, operator){
    let productsPrice = {
        'multiply' : numOne * numTwo,
        'divide' : numOne / numTwo,
        'add' : numOne + numTwo,
        'subtract' : numOne - numTwo
    }
    console.log(`${productsPrice[operator]}`)
}

solve(5,
5,
'multiply')