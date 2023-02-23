function solve(string) {
    string = JSON.parse(string);
    for (const [key, value] of Object.entries(string)) {
        console.log(`${key}: ${value}`)
    }
}

solve('{"name": "George", "age": 40, "town": "Sofia"}')