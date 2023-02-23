
function solve(list){
    let output = []

    for (let i=0; i < list.length; i++){
        let [name, lat, lon] = list[i].split(' | ')

        const town = {
            town: name,
            latitude: parseFloat(lat).toFixed(2),
            longitude: parseFloat(lon).toFixed(2),
        }
        output.push(town)
    }
    for (let data of output){
        console.log(data)
    }
}


solve(['Sofia | 42.696552 | 23.32601',
    'Beijing | 39.913818 | 116.363625'])