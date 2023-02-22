function solve(start, end) {
    let sum = [];
    for (let i = start; i <= end; i++) {
        sum.push(i)
    }
    console.log(`${sum.join(' ')}\nSum: ${sum.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}`);
}

solve(5, 10)