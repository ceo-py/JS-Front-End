function solve(list) {
    let output = {}

    for (let item of list) {
        let [name, address] = item.split(':')
        output[name] = address
    }
    for (let key of Object.keys(output).sort()){
        console.log(`${key} -> ${output[key]}`)
    }
}

solve(['Tim:Doe Crossing',
    'Bill:Nelson Place',
    'Peter:Carlyle Ave',
    'Bill:Ornery Rd'])