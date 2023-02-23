function solve(list) {
    let output = {}

    for (let item of list) {
        let [day, name] = item.split(' ')
        if (day in output) {
            console.log(`Conflict on ${day}!`)
        } else {
            output[day] = name
            console.log(`Scheduled for ${day}`)
        }
    }
    for (let [key, value] of Object.entries(output)){
        console.log(`${key} -> ${value}`)
    }
}


solve(['Monday Peter',
    'Wednesday Bill',
    'Monday Tim',
    'Friday Tim'])
