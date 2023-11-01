function motoGpRace(list) {
    list.shift()
    const raceOutput = []
    const  findRider = (riderName) =>  raceOutput.filter(x => x.rider === riderName)[0]

    const commands = {
        'StopForFuel': (rider, fuel, position) => {
            const currentRider = findRider(rider)
            if (currentRider.fuel < fuel) {
                currentRider.position = position
                console.log(`${rider} stopped to refuel but lost his position, now he is ${position}.`)
            } else {
                console.log(`${rider} does not need to stop for fuel!`)
            }
        },
        'Overtaking': (riderOne, riderTwo) => {
            const [riderOneObj, riderTwoObj] = [findRider(riderOne), findRider(riderTwo)]
            if (riderOneObj.position < riderTwoObj.position) {
                [riderOneObj.position, riderTwoObj.position] = [riderTwoObj.position, riderOneObj.position]
                console.log(`${riderOne} overtook ${riderTwo}!`)
            }
        },
        'EngineFail': (rider, laps) => {
            raceOutput.splice(raceOutput.findIndex(x => x.rider === rider),1)
            console.log(`${rider} is out of the race because of a technical issue, ${laps} laps before the finish.`)
        }
    }

    while (true) {
        const currentRowData = list.shift()
        if (currentRowData === 'Finish') break
        if (currentRowData.includes('|')) {
            const [rider, fuel, position] = currentRowData.split('|').map(x => isNaN(x)? x: Number(x))
            raceOutput.push({
                rider, fuel, position
            })
            continue
        }
        const [command, ...data] = currentRowData.split(' - ').map(x => isNaN(x)? x: Number(x))
        commands[command](...data)

    }
    raceOutput.forEach(x => console.log(`${x.rider}\n  Final position: ${x.position}`))
}







// function motoGpRace(list) {
//     list.shift()
//     const raceOutput = []
//
//     const findRider = (riderName) => raceOutput.findIndex(x => x.rider === riderName);
//
//     const swapPos = (RiderOneIndex, RiderTwoIndex) => [raceOutput[RiderOneIndex].position, raceOutput[RiderTwoIndex].position] = [raceOutput[RiderTwoIndex].position, raceOutput[RiderOneIndex].position]
//
//     const commands = {
//         'StopForFuel': (rider, minimumFuel, changedPos) => {
//             const riderIndex = findRider(rider)
//             const currentRider = raceOutput[riderIndex]
//             if (currentRider.fuel < minimumFuel) {
//                 currentRider.position = changedPos
//                 console.log(`${rider} stopped to refuel but lost his position, now he is ${changedPos}.`)
//             } else {
//                 console.log(`${rider} does not need to stop for fuel!`)
//             }
//         },
//         'Overtaking': (riderOne, riderTwo) => {
//             const [riderOneIndex, riderTwoIndex] = [findRider(riderOne), findRider(riderTwo)]
//             if (raceOutput[riderOneIndex].position < raceOutput[riderTwoIndex].position) {
//                 swapPos(riderOneIndex, riderTwoIndex)
//                 console.log(`${riderOne} overtook ${riderTwo}!`)
//             }
//         },
//         'EngineFail': (rider, lapsLeft) => {
//             raceOutput.splice(findRider(rider), 1)
//             console.log(`${rider} is out of the race because of a technical issue, ${lapsLeft} laps before the finish.`)
//         }
//     }
//
//     firstLoop: while (list.length !== 0) {
//
//         while (list.length !== 0) {
//             const currentRowData = list.shift()
//             if (currentRowData === 'Finish') break firstLoop
//             if (currentRowData.includes('|')) {
//                 const [rider, fuel, position] = currentRowData.split('|').map(x=> isNaN(x)? x: Number(x))
//                 raceOutput.push({rider, fuel, position})
//                 continue
//             }
//             const [command, ...data] = currentRowData.split(' - ')
//             commands[command](...data)
//         }
//     }
//     raceOutput.forEach(x => console.log(`${x.rider}\n  Final position: ${x.position}`))
// }




motoGpRace(["3",
"Valentino Rossi|100|1",
"Marc Marquez|90|2",
"Jorge Lorenzo|80|3",
"StopForFuel - Valentino Rossi - 50 - 1",
"Overtaking - Marc Marquez - Jorge Lorenzo",
"EngineFail - Marc Marquez - 10",
"Finish",
"Marc Marquez|90|2",])




// motoGpRace(["4",
// "Valentino Rossi|100|1",
// "Marc Marquez|90|3",
// "Jorge Lorenzo|80|4",
// "Johann Zarco|80|2",
// "StopForFuel - Johann Zarco - 90 - 5",
// "Overtaking - Marc Marquez - Jorge Lorenzo",
// "EngineFail - Marc Marquez - 10",
// "Finish"])
