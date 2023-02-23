function solve(list) {
    let output = []

    for (let item of list) {
        const employee = {
            name: item,
            personalNumber: item.length
        }
        output.push(employee)

    }

    for (let item of output) {
        console.log(`Name: ${item.name} -- Personal Number: ${item.personalNumber}`)
    }
}


solve([
    'Silas Butler',
    'Adnaan Buckley',
    'Juan Peterson',
    'Brendan Villarreal'
])


//
// function solve(list){
//     let output = {}
//
//     for (let item of list){
//         output[item] = item.length
//     }
//
//     for (let [key, value] of Object.entries(output)){
//         console.log(`Name: ${key} -- Personal Number: ${value}`)
//     }
// }
//
