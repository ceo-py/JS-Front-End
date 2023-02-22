
function solve(number) {
    let numbers = number.toString();
    let sum = 0

    for (let i=0; i < numbers.length; i++){
        sum += parseInt(numbers[i])
    }
    console.log(sum)
}


solve(245678)