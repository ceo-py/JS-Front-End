function solve(stock, ordered) {
    let output = {}
     function addProducts (list){
        for (i = 0; i < list.length; i+=2){
            let [name, quantity] = [list[i], list[i+1]]
            if (name in output){
                output[name] += parseInt(quantity)
            } else {
                output[name] = parseInt(quantity)
            }
        }
     }
     addProducts(stock)
     addProducts(ordered)
    for (let [key, value] of Object.entries(output)) {

        const product = {
            name: key,
            quantity: value,
            printInfo: function (){
                console.log(`${this.name} -> ${this.quantity}`)
            }
        }
        product.printInfo()
    }
}



solve([
        'Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'
    ],
    [
        'Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30'
    ])