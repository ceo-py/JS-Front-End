

function solve(fruit, weight, priceKG){
    weight /= 1000
    console.log(`I need $${(weight*priceKG).toFixed(2)} to buy ${weight.toFixed(2)} kilograms ${fruit}.`)
}



solve('orange', 2500, 1.80)