

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



// function solve(startingYield) {
//   let days = 0;
//   let totalSpice = 0;
//   while (startingYield >= 100) {
//     days++;
//     totalSpice += startingYield;
//     totalSpice -= 26;
//     startingYield -= 10;
//   }
//   if (totalSpice >= 26) {
//     totalSpice -= 26;
//   } else {
//     totalSpice = 0;
//   }
//   console.log(days);
//   console.log(totalSpice);
// }


solve(450)