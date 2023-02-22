
function solve(list){
    list.sort((a, b) => a - b);
    let output = []
    while (list.length > 0){
        output.push(list.shift())
        output.push(list.pop())
    }
    return output
}


solve([1, 65, 3, 52, 48, 63, 31, -3, 18, 56])


