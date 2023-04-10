function sprintReview(args) {
	const checkAssignee = (object, name) => {
		return object.hasOwnProperty(name);
	};

	const number = Number(args.shift());
	const collection = {};

	for (let i = 0; i < number; i++) {
		const tokens = args[i].split(':');
		const assignee = tokens[0];
		const taskId = tokens[1];
		const title = tokens[2];
		const status = tokens[3];
		const points = tokens[4];
		if (!checkAssignee(collection, assignee)) {
			collection[assignee] = [[taskId, title, status, points]];
		} else {
			collection[assignee].push([taskId, title, status, points]);
		}
	}

	args.forEach((element) => {
		const tokens = element.split(':');
		let command = tokens[0];

		if (command === 'Add New') {
			let assignee = tokens[1];
			let taskId = tokens[2];
			let title = tokens[3];
			let status = tokens[4];
			let points = tokens[5];
			if (checkAssignee(collection, assignee)) {
				collection[assignee].push([taskId, title, status, points]);
			} else {
				console.log(
					`Assignee ${assignee} does not exist on the board!`
				);
			}
		} else if (command === 'Change Status') {
			let assignee = tokens[1];
			let taskId = tokens[2];
			let newStatus = tokens[3];
			if (checkAssignee(collection, assignee)) {
				let changed = false;
				for (let i = 0; i < collection[assignee].length; i++) {
					if (collection[assignee][i][0] === taskId) {
						collection[assignee][i][2] = newStatus;
						changed = true;
						break;
					}
				}
				if (!changed) {
					console.log(
						`Task with ID ${taskId} does not exist for ${assignee}!`
					);
				}
			} else {
				console.log(
					`Assignee ${assignee} does not exist on the board!`
				);
			}
		} else if (command === 'Remove Task') {
			let assignee = tokens[1];
			let index = tokens[2];

			if (checkAssignee(collection, assignee)) {
				let arrLength = collection[assignee].length;
				if (index < 0 || index >= arrLength) {
					console.log('Index is out of range!');
				} else {
					collection[assignee].splice(index, 1);
				}
			} else {
				console.log(
					`Assignee ${assignee} does not exist on the board!`
				);
			}
		}
	});

	const results = {
        'ToDo': 0,
        'In Progress': 0,
        'Code Review': 0,
        'Done': 0
    };
	const aggregate = {
        'Done': 0,
        'Not Done': 0
    };

	for (const prop in collection) {
		for (let el of collection[prop]) {
			let statusName = el[2];
			let points = Number(el[3]);
            results[statusName] += points;
			if (statusName === 'Done') {
                aggregate[statusName] += points;
			} else {
                aggregate['Not Done'] += points;
			}
		}
	}

	for (const prop in results) {
		if (prop === 'Done') {
			console.log(`${prop} Points: ${results[prop]}pts`);
		} else {
			console.log(`${prop}: ${results[prop]}pts`);
		}
	}

	if (aggregate['Done'] >= aggregate['Not Done']) {
		console.log('Sprint was successful!');
	} else {
		console.log('Sprint was unsuccessful...');
	}
}




// function springReview(list) {
//     const inputs = list.shift()
//     const taskBoard = {}
//
//     for (const i in list) {
//         const info = list[i].split(':')
//         if (i < inputs) {
//             if (!taskBoard.hasOwnProperty(info[0])) taskBoard[info[0]] = []
//             // taskBoard[info[0]].push({
//             //     taskId: info[1], title: info[2], status: info[3], estimatedPoints: Number(info[4]),
//             // })
//             taskBoard[info[0]].push([
//                 info[1], info[2], info[3], Number(info[4])
//             ])
//         } else {
//             if (!taskBoard.hasOwnProperty(info[1])) {
//                 console.log(`Assignee ${info[1]} does not exist on the board!`)
//                 continue
//             }
//             if (info[0] === 'Add New') {
//                 taskBoard[info[1]].push([
//                     info[1], info[2], info[3], Number(info[4])
//                 ])
//                 // taskBoard[info[1]].push({
//                 //     taskId: info[2], title: info[3], status: info[4], estimatedPoints: Number(info[5]),
//                 // })
//             } else if (info[0] === 'Change Status') {
//                 const task = taskBoard[info[1]].filter(x => x[0] === info[2])
//                 if (task.length === 0) {
//                     console.log(`Task with ID ${info[2]} does not exist for ${info[1]}!`)
//                     continue
//                 }
//                 task[0][2] = info[3]
//             } else if (info[0] === 'Remove Task') {
//                 const index = Number(info[2])
//                 if (index < 0 || taskBoard[info[1]].length <= index) {
//                     console.log('Index is out of range!')
//                     continue
//                 }
//                 taskBoard[info[1]].splice(index, 1)
//             }
//         }
//     }
//
//     const points = {
//         'ToDo': 0, 'In Progress': 0, 'Code Review': 0, 'Done': 0,
//     }
//     Object.values(taskBoard).forEach(items => items.forEach(x => points[x[2]] += x[3]));
//     Object.entries(points).forEach(x => console.log(`${x[0] !== 'Done' ? x[0] : `${x[0]} Points`}: ${x[1]}pts`))
//     points.Done >= points.ToDo + points["In Progress"] + points["Code Review"] ? console.log('Sprint was successful!') : console.log('Sprint was unsuccessful...');
// }

// springReview(['5', 'Kiril:BOP-1209:Fix Minor Bug:ToDo:3', 'Mariya:BOP-1210:Fix Major Bug:In Progress:3', 'Peter:BOP-1211:POC:Code Review:5', 'Georgi:BOP-1212:Investigation Task:Done:2', 'Mariya:BOP-1213:New Account Page:In Progress:13', 'Add New:Kiril:BOP-1217:Add Info Page:In Progress:5', 'Change Status:Peter:BOP-1290:ToDo', 'Remove Task:Mariya:1', 'Remove Task:Joro:1',])


// springReview(['4', 'Kiril:BOP-1213:Fix Typo:Done:1', 'Peter:BOP-1214:New Products Page:In Progress:2', 'Mariya:BOP-1215:Setup Routing:ToDo:8', 'Georgi:BOP-1216:Add Business Card:Code Review:3', 'Add New:Sam:BOP-1237:Testing Home Page:Done:3', 'Change Status:Georgi:BOP-1216:Done', 'Change Status:Will:BOP-1212:In Progress', 'Remove Task:Georgi:3', 'Change Status:Mariya:BOP-1215:Done',])