function solve() {
    const info = document.querySelector('.info')
    const [departBtn, arriveBtn] = document.querySelectorAll('input')
    const API = 'http://localhost:3030/jsonstore/bus/schedule/'
    let [nextId, location] = ['depot', null]
    const test = {
        "name": "Depot",
        "next": "0361"
    }

    async function depart() {
        const response = await fetch(`${API}${nextId}`)
        const data = await response.json()
        location = data.name
        nextId = data.next
        info.textContent = `Next stop ${location}`
        departBtn.disabled = true
        arriveBtn.disabled = false
    }

    async function arrive() {
        info.textContent = `Arriving at ${location}`
        departBtn.disabled = false
        arriveBtn.disabled = true
    }

    return {
        depart, arrive
    };
}

let result = solve();










// function solve() {
//     const info = document.querySelector('.info')
//     const [departBtn, arriveBtn] = document.querySelectorAll('input')
//     const apiURL = 'http://localhost:3030/jsonstore/bus/schedule/'
//     let [departId, departLocation] = ['depot', null]
//
//     departBtn.innerHTML = ''
//     function depart() {
//         fetch(`${apiURL}${departId}`).then(x => x.json()).then(x => {
//             departLocation = x['name']
//             info.textContent = `Next stop ${departLocation}`
//             departId = x['next']
//             departBtn.disabled = true
//             arriveBtn.disabled = false
//         }).catch()
//     }
//
//     async function arrive() {
//         info.textContent = `Arriving at ${departLocation}`
//         departBtn.disabled = false
//         arriveBtn.disabled = true
//
//     }
//
//
//     return {
//         depart,
//         arrive
//     };
// }
//
// let result = solve();


// function solve() {
//     const info = document.querySelector('.info')
//     const [departBtn, arriveBtn] = document.querySelectorAll('input')
//     const apiURL = 'http://localhost:3030/jsonstore/bus/schedule/'
//     let [departId, departLocation] = ['depot', null]
//
//
//
//     async function depart() {
//         let data = await fetch(`${apiURL}${departId}`)
//         data = await data.json()
//
//         departLocation = data['name']
//         info.textContent = `Next stop ${departLocation}`
//         departId = data['next']
//         departBtn.disabled = true
//         arriveBtn.disabled = false
//     }
//
//     async function arrive() {
//         info.textContent = `Arriving at ${departLocation}`
//         departBtn.disabled = false
//         arriveBtn.disabled = true
//
//     }
//
//
//     return {
//         depart,
//         arrive
//     };
// }
//
// let result = solve();




