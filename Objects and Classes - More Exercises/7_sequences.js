function solve(list) {
    list = list.map(el => JSON.parse(el))
    list.forEach(el => el.sort((a, b) => b - a))
    let output = []

    for (let i = 0; i < list.length; i++) {
        let currentList = list[i]
        let isUnique = true

        for (let j = 0; j < output.length; j++) {
            let nextList = output[j]
            if (nextList.toString() === currentList.toString()) {
                isUnique = false
                break
            }
        }
        if (isUnique) {
            output.push(currentList)
        }
    }
    output.sort((a, b) => a.length - b.length)
    output.forEach(el => console.log(`[${el.join(', ')}]`))
}


solve(["[-3, -2, -1, 0, 1, 2, 3, 4]", "[10, 1, -17, 0, 2, 13]", "[4, -3, 3, -2, 2, -1, 1, 0]"])

//
// function solve(list) {
//     const uniqueLists = [];
//
//     list
//         .map(JSON.parse)
//         .map(array => array.sort((a, b) => b - a))
//         .forEach(array => {
//             const isUnique = !uniqueLists.some(list => list.toString() === array.toString())
//             if (isUnique) uniqueLists.push(array);
//         })
//
//     uniqueLists.sort((a, b) => a.length - b.length)
//         .forEach(array => console.log(`[${array.join(', ')}]`))
// }
