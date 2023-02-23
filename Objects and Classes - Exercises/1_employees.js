
function solve(list){
    let output = []

    for (let item of list){
        output[item] = item.length
    }

    for (let [key, value] of Object.entries(output)){
        console.log(`Name: ${key} -- Personal Number: ${value}`)
    }
}


solve([
    'Silas Butler',
    'Adnaan Buckley',
    'Juan Peterson',
    'Brendan Villarreal'
])