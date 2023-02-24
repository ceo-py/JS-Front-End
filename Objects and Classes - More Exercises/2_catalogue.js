function solve(list) {
    let output = {}


    for (item of list) {
        [product, price] = item.split(' : ')
        letter = product[0]
        if (!output.hasOwnProperty(letter)) {
            output[letter] = []
        }
        output[letter].push({product, price})
    }

    for (key of Object.keys(output).sort()) {
        console.log(key)
        for (let product of output[key].sort((a, b) => a.product.localeCompare(b.product)))  {
            console.log(`  ${product.product}: ${product.price}`)
        }
    }
}


solve(['Appricot : 20.4', 'Fridge : 1500', 'TV : 1499', 'Deodorant : 10', 'Boiler : 300', 'Apple : 1.25', 'Anti-Bug Spray : 15', 'T-Shirt : 10'])

