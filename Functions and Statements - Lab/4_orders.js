

function solve(product, quantity){
    let productsPrice = {
        'coffee' : 1.50,
        'water' : 1.00,
        'coke' : 1.40,
        'snacks' : 2.00
    }
    console.log(`${(productsPrice[product] * quantity).toFixed(2)}`)
}

solve("coffee", 2)