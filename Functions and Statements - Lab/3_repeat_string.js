function solve(string, repeat) {
    let output = string;
    for (let i = 0; i < repeat - 1; i++) {
        output += string
    }
    console.log(output)
}


solve("String", 2)