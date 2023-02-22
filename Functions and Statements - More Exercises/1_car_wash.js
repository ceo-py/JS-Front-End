function solve(list) {
    let clean = 0

    for (let command of list){
        if (command === 'soap'){
            clean += 10;
        } else if (command === 'water'){
            clean *= 1.20;
        } else if (command === 'vacuum cleaner'){
            clean *= 1.25;
        } else if (command === 'mud'){
            clean *= 0.90;
        }
    }
    console.log(`The car is ${clean.toFixed(2)}% clean.`)
}

solve(["soap", "water", "mud", "mud", "water", "mud", "vacuum cleaner"])