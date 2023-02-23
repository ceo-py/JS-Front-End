
function solve(dict){

    // for (const key in dict) {
    //     console.log(`${key}: ${dict[key]}`);
    // }

    for (const [key, value] of Object.entries(dict)) {
        console.log(`${key} -> ${value}`)

    }
}


solve({
    name: "Sofia",
    area: 492,
    population: 1238438,
    country: "Bulgaria",
    postCode: "1000"
})