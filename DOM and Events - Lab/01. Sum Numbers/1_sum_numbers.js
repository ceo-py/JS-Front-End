function calc() {
    document.querySelector('#sum').value = eval([...document.querySelectorAll('input[type="text"]')]
        .slice(0,2).map(x => parseFloat(x.value)).join('+'))
}


// function calc() {
//     const num1 = parseFloat(document.getElementById('num1').value)
//     const num2 = parseFloat(document.getElementById('num2').value)
//     const sum = num1 + num2
//     document.getElementById('sum').value = sum
// }