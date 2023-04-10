function springReview(list) {
    const inputs = list.shift()
    const taskBoard = {}

    for (const i in list) {
        const info = list[i].split(':')
        if (i < inputs) {
            if (!taskBoard.hasOwnProperty(info[0])) taskBoard[info[0]] = []
            taskBoard[info[0]].push({
                taskId: info[1], title: info[2], status: info[3], estimatedPoints: Number(info[4]),
            })

        } else {
            if (info[0] === 'Add New') {
                if (!taskBoard.hasOwnProperty(info[1])) {
                    console.log(`Assignee ${info[1]} does not exist on the board!`)
                    continue
                }
                taskBoard[info[1]].push({
                    taskId: info[2], title: info[3], status: info[4], estimatedPoints: Number(info[5]),
                })

            } else if (info[0] === 'Change Status') {
                if (!taskBoard.hasOwnProperty(info[1])) {
                    console.log(`Assignee ${info[1]} does not exist on the board!`)
                    continue
                }
                const task = taskBoard[info[1]].filter(x => x.taskId === info[2])
                if (task.length === 0) {
                    console.log(`Task with ID ${info[2]} does not exist for ${info[1]}!`)
                    continue
                }
                task[0].status = info[3]
            } else if (info[0] === 'Remove Task') {
                if (!taskBoard.hasOwnProperty(info[1])) {
                    console.log(`Assignee ${info[1]} does not exist on the board!`)
                    continue
                }
                const index = Number(info[2])
                if (index < 0 || taskBoard[info[1]].length < index) {
                    console.log('Index is out of range!')
                    continue
                }
                taskBoard[info[1]].splice(index, 1)
            }
        }
    }

    const points = {
        'ToDo': 0,
        'In Progress': 0,
        'Code Review': 0,
        'Done': 0,
    }

    for (const items of Object.values(taskBoard)) {
        items.forEach(x => points[x.status] += x.estimatedPoints)
    }

    console.log(`ToDo: ${points.ToDo}pts`)
    console.log(`In Progress: ${points["In Progress"]}pts`)
    console.log(`Code Review: ${points["Code Review"]}pts`)
    console.log(`Done Points: ${points.Done}pts`)

    if (points.Done >= points.ToDo + points["In Progress"] +points["Code Review"]) {
        console.log('Sprint was successful!')
    } else {
        console.log('Sprint was unsuccessful...')
    }

}

// springReview(['5', 'Kiril:BOP-1209:Fix Minor Bug:ToDo:3', 'Mariya:BOP-1210:Fix Major Bug:In Progress:3', 'Peter:BOP-1211:POC:Code Review:5', 'Georgi:BOP-1212:Investigation Task:Done:2', 'Mariya:BOP-1213:New Account Page:In Progress:13', 'Add New:Kiril:BOP-1217:Add Info Page:In Progress:5', 'Change Status:Peter:BOP-1290:ToDo', 'Remove Task:Mariya:1', 'Remove Task:Joro:1',])

springReview( [
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