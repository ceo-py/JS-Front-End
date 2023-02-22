function solve(group, type, day) {
    let price = 0
    let discount = 1
    let discountAdd = 0
    if (type === 'Students') {
        if (day ===  'Friday'){
            price = 8.45
        } else if (day ===  'Saturday'){
            price = 9.80
        } else if (day ===  'Sunday'){
            price = 10.46
        }
        if (group >= 30){
            discount = 0.85
        }
    } else if (type === 'Business') {
        if (day ===  'Friday'){
            price = 10.90
        } else if (day ===  'Saturday'){
            price = 15.60
        } else if (day ===  'Sunday'){
            price = 16
        }
        if (group >= 100){
            discountAdd = 10 * price
        }
    } else if (type === 'Regular') {
        if (day ===  'Friday'){
            price = 15
        } else if (day ===  'Saturday'){
            price = 20
        } else if (day ===  'Sunday'){
            price = 22.50
        }
        if (group >= 10 && group <= 20){
            discount = 0.95
        }
    }
    console.log(`Total price: ${((price * group - discountAdd) * discount).toFixed(2)}`)
}

solve(30,"Students","Sunday")
solve(40,
"Regular",
"Saturday")