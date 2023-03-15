function solve() {
    const info = document.querySelector('.info')
    const [departBtn, arriveBtn] = document.querySelectorAll('input')
    const apiURL = 'http://localhost:3030/jsonstore/bus/schedule/'
    let [departId, departLocation] = ['depot', null]


    function depart() {
        fetch(`${apiURL}${departId}`).then(x => x.json()).then(x => {
            departLocation = x['name']
            info.textContent = `Next stop ${departLocation}`
            departId = x['next']
            departBtn.disabled = true
            arriveBtn.disabled = false
        }).catch()
    }

    async function arrive() {
        info.textContent = `Arriving at ${departLocation}`
        departBtn.disabled = false
        arriveBtn.disabled = true

    }


    return {
        depart,
        arrive
    };
}

let result = solve();
