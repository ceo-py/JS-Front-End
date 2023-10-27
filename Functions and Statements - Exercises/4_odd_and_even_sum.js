function solve(numbers){
    let oddNumbers = 0
    let evenNumbers = 0;
    [...numbers.toString()].map(Number).forEach(n => n % 2 === 0? evenNumbers += n: oddNumbers += n)
    // [...numbers.toString()].forEach(n => Number(n) % 2 === 0? evenNumbers += Number(n): oddNumbers += Number(n))
    console.log(`Odd sum = ${oddNumbers}, Even sum = ${evenNumbers}`)
}



// function solve(numbers){
//     numbers = numbers.toString()
//     let oddNumbers = 0
//     let evenNumbers = 0
//
//     for (let number of numbers) {
//         number = parseInt(number)
//         if (number % 2 === 0){
//             evenNumbers += number
//         } else {
//             oddNumbers += number
//         }
//     }
//     console.log(`Odd sum = ${oddNumbers}, Even sum = ${evenNumbers}`)
// }


solve(3495892137259234)