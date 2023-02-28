function subtract() {
    let numberOne = parseFloat(document.querySelector('#firstNumber').value)
    let numberTwo = parseFloat(document.querySelector('#secondNumber').value)
    document.querySelector('#result').textContent = numberOne - numberTwo
}
