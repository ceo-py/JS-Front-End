function solve (number, list) {
    console.log(`${list.slice(0, number).reverse().join(' ')}`)
}

solve(3, [10, 20, 30, 40, 50])

