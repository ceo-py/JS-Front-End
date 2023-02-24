function solve(list) {
    allFlights = list.shift()
    changedStatuses = list.shift()
    checkStatus = list.shift()[0]

    flights = {}

    for (item of allFlights) {
        [flight, ...destination] = item.split(' ')
        flights[flight] = {}
        flights[flight].Destination = destination.join(' ')
        flights[flight].Status = ''
    }

    for (item of changedStatuses) {
        [flight, changeStatus] = item.split(' ')
        if (flights.hasOwnProperty(flight)){
            flights[flight].Status = changeStatus
        }

    }
    for (flight of Object.entries(flights)) {
        if (flight[1].Status.length === 0 && checkStatus === 'Ready to fly') {
            flight[1].Status = 'Ready to fly'
        }
        if (flight[1].Status === checkStatus) {
            console.log(flight[1])
        }
    }
}


// solve([['WN269 Delaware',
//     'FL2269 Oregon',
//     'WN498 Las Vegas',
//     'WN3145 Ohio',
//     'WN612 Alabama',
//     'WN4010 New York',
//     'WN1173 California',
//     'DL2120 Texas',
//     'KL5744 Illinois',
//     'WN678 Pennsylvania'],
//     ['DL2120 Cancelled',
//         'WN612 Cancelled',
//         'WN1173 Cancelled',
//         'SK430 Cancelled'],
//     ['Cancelled']
// ])

solve([['WN269 Delaware',
   'FL2269 Oregon',
    'WN498 Las Vegas',
    'WN3145 Ohio',
    'WN612 Alabama',
    'WN4010 New York',
    'WN1173 California',
    'DL2120 Texas',
    'KL5744 Illinois',
    'WN678 Pennsylvania'],
    ['DL2120 Cancelled',
	'WN612 Cancelled',
	'WN1173 Cancelled',
	'SK330 Cancelled'],
	['Ready to fly']
])