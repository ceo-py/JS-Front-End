function solve(list) {
    let output = {}
    for (item of list) {
        json = JSON.parse(item)
        output[Object.keys(json)[0]] = Object.values(json)[0]
    }
    for (item of Object.entries(output).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))){
        console.log(`Term: ${item[0]} => Definition: ${item[1]}`)
    }
}


solve([
    '{"Coffee":"A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub."}',
    '{"Bus":"A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare."}',
    '{"Boiler":"A fuel-burning apparatus or container for heating water."}',
    '{"Tape":"A narrow strip of material, typically used to hold or fasten something."}',
    '{"Microphone":"An instrument for converting sound waves into electrical energy variations which may then be amplified, transmitted, or recorded."}'
])