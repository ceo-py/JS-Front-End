function solve(start, end) {
    const sum = []
    while (start <= end) {
        sum.push(start)
        start += 1
    }
    sum.forEach(x => process.stdout.write(`${x} `))
    console.log(`\nSum: ${eval(sum.join('+'))}`)
}

// function solve(start, end) {
//     const sum = []
//     for (let i = start; i <= end; i++) {
//         sum.push(i)
//     }
//     console.log(`${sum.join(' ')}\nSum: ${sum.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}`)
// }

solve(5, 10)