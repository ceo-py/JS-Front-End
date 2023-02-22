
function solve(numbers){
    numbers = numbers.toString()

    function averageNumber(numbers){
        let sum = 0
        for (let number of numbers){
            sum += parseInt(number)
        }
        return sum / numbers.length
    }

    while (averageNumber(numbers) < 5){
        numbers += '9'
    }
    console.log(numbers)
}

solve(5835)