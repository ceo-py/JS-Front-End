function springReview(list) {
    const [assignee, initial_inputs] = [{}, Number(list.shift())]
    list.forEach((x, index) => {
            if (index < initial_inputs) {
                const [assigneeName, taskId, title, status, estimatedPoints] = x.split(':').map(x => isNaN(x) ? x : Number(x))
                if (!assignee.hasOwnProperty(assigneeName)) assignee[assigneeName] = []
                assignee[assigneeName].push({taskId, title, status, estimatedPoints})
            } else {
                const [command, assigneeName, taskIdIndex, titleStatus, status, estimatedPoints] =  x.split(':').map(x => isNaN(x) ? x : Number(x))
                if (!assignee.hasOwnProperty(assigneeName)) {
                    console.log(`Assignee ${assigneeName} does not exist on the board!`)
                } else if (command === 'Add New') {
                    assignee[assigneeName].push({taskId: taskIdIndex, title: titleStatus, status, estimatedPoints})
                } else if (command === 'Change Status') {
                    const foundTask = assignee[assigneeName].find(x => x.taskId === taskIdIndex)
                    foundTask ? foundTask.status = titleStatus : console.log(`Task with ID ${taskIdIndex} does not exist for ${assigneeName}!`)
                } else if (command === 'Remove Task') {
                    const index = Number(taskIdIndex)
                    index < 0 || index >= assignee[assigneeName].length ? console.log('Index is out of range!') : assignee[assigneeName].splice(index, 1)
                }
            }
        }
    )
    const score = {'ToDo': 0, 'In Progress': 0, 'Code Review': 0, 'Done': 0}
    for (const key in assignee) assignee[key].forEach(x => score[x.status] += x.estimatedPoints)
    Object.keys(score).forEach(x => x !== 'Done' ? console.log(`${x}: ${score[x]}pts`) : console.log(`${x} Points: ${score[x]}pts`))
    console.log(score.Done >= score.ToDo + score["In Progress"] + score["Code Review"] ? 'Sprint was successful!' : 'Sprint was unsuccessful...')
}




//
// function springReview(list) {
//
//     const [assignee, initial_inputs] = [{}, Number(list.shift())]
//
//     list.forEach((x, index) => {
//             if (index < initial_inputs) {
//                 const [assigneeName, taskId, title, status, estimatedPoints] = x.split(':')
//                 if (!assignee.hasOwnProperty(assigneeName)) assignee[assigneeName] = []
//                 assignee[assigneeName].push({taskId, title, status, estimatedPoints: Number(estimatedPoints)})
//             } else {
//                 const [command, ...data] = x.split(':')
//                 if (!assignee.hasOwnProperty(data[0])) {
//                     console.log(`Assignee ${data[0]} does not exist on the board!`)
//
//                 } else if (command === 'Add New') {
//                     assignee[data[0]].push({
//                         taskId: data[1],
//                         title: data[2],
//                         status: data[3],
//                         estimatedPoints: Number(data[4])
//                     })
//
//                 } else if (command === 'Change Status') {
//                     const foundTask = assignee[data[0]].filter(x => x.taskId === data[1])[0]
//                     if (foundTask) {
//                         foundTask.status = data[2]
//                     } else {
//                         console.log(`Task with ID ${data[1]} does not exist for ${data[0]}!`)
//                     }
//
//                 } else if (command === 'Remove Task') {
//                     if (Number(data[1]) < 0 || Number(data[1]) >= assignee[data[0]].length) {
//                         console.log('Index is out of range!')
//                     } else {
//                         assignee[data[0]].splice(Number(data[1]), 1)
//                     }
//                 }
//             }
//         }
//     )
//
//     const score = {
//         'ToDo': 0,
//         'In Progress': 0,
//         'Code Review': 0,
//         'Done': 0
//     }
//     for (const key in assignee) {
//         assignee[key].forEach(x => score[x.status] += x.estimatedPoints)
//     }
//
//     for (const key in score) {
//         if (key !== 'Done') {
//             console.log(`${key}: ${score[key]}pts`)
//         } else {
//             console.log(`${key} Points: ${score[key]}pts`)
//         }
//     }
//     if (score.Done >= Object.values(score).reduce((a, b) => a + b, 0) - score.Done) {
//         console.log('Sprint was successful!')
//     } else {
//         console.log('Sprint was unsuccessful...')
//     }
//
// }
//


// springReview(['5', 'Kiril:BOP-1209:Fix Minor Bug:ToDo:3', 'Mariya:BOP-1210:Fix Major Bug:In Progress:3', 'Peter:BOP-1211:POC:Code Review:5', 'Georgi:BOP-1212:Investigation Task:Done:2', 'Mariya:BOP-1213:New Account Page:In Progress:13', 'Add New:Kiril:BOP-1217:Add Info Page:In Progress:5', 'Change Status:Peter:BOP-1290:ToDo', 'Remove Task:Mariya:1', 'Remove Task:Joro:1',])


springReview([
    '4',
    'Kiril:BOP-1213:Fix Typo:Done:1',
    'Peter:BOP-1214:New Products Page:In Progress:2',
    'Mariya:BOP-1215:Setup Routing:ToDo:8',
    'Georgi:BOP-1216:Add Business Card:Code Review:3',
    'Add New:Sam:BOP-1237:Testing Home Page:Done:3',
    'Change Status:Georgi:BOP-1216:Done',
    'Change Status:Will:BOP-1212:In Progress',
    'Remove Task:Georgi:3',
    'Change Status:Mariya:BOP-1215:Done',
])