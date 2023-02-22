

function solve(source){
    let days = 0
    let yield = 0

    while (source >= 100){
        days += 1;
        yield += (source - 26);
        source -= 10
    }
    if (yield >= 10) {
        yield -= 26;
    } else
        yield = 0
    console.log(`${days}\n${yield}`)
}


solve(450)