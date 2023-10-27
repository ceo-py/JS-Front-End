function solve(string) {
    const objectGen = JSON.parse(string)
    Object.entries(objectGen).forEach(data => console.log(`${data[0]}: ${data[1]}`))
}



// function solve(string) {
//     string = JSON.parse(string);
//     for (const [key, value] of Object.entries(string)) {
//         console.log(`${key}: ${value}`)
//     }
// }

solve('{"name": "George", "age": 40, "town": "Sofia"}')