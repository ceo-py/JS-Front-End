function solve(day, age) {
    function ticketPrice(age, ticketMinPrice, ticketMidPrice, ticketMaxPrice) {
        if (age < 0 || age > 122) return "Error!"
        else if (age <= 18) return `${ticketMinPrice}$`
        else if (age <= 64) return `${ticketMidPrice}$`
        else if (age <= 122) return `${ticketMaxPrice}$`
    }

    if (day === 'Weekday') {
        console.log(ticketPrice(age, 12, 18, 12))
    } else if (day === 'Weekend') {
        console.log(ticketPrice(age, 15, 20, 15))
    } else if (day === 'Holiday') {
        console.log(ticketPrice(age, 5, 12, 10))
    }
}






// function solve (day, age) {
//     function ticketPrice (age, ticketMinPrice, ticketMidPrice, ticketMaxPrice) {
//     if (age >= 0 && age <= 18){
//             return  `${ticketMinPrice}$`;
//         }
//         else if (age > 18 && age <= 64){
//             return  `${ticketMidPrice}$`
//         }
//         else if (age > 64 && age <= 122){
//             return  `${ticketMaxPrice}$`
//         } else {
//             return "Error!"
//         }
//     }
//     if (day === 'Weekday') {
//         console.log(ticketPrice(age,  12, 18, 12))
//     } else if (day === 'Weekend') {
//         console.log(ticketPrice(age, 15, 20, 15))
//     } else if (day === 'Holiday') {
//         console.log(ticketPrice(age, 5, 12, 10))
//     }
// }





solve('Holiday', -12)