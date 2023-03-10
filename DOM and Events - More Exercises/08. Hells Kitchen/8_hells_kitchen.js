function solve() {
    document.querySelector('#btnSend').addEventListener('click', onClick)
    const input = document.querySelector('textarea')
    let bestRestaurant = document.querySelector('#bestRestaurant > p')
    let workers = document.querySelector('#workers > p')
    let restaurantInfo = {}
    bestRestaurant.textContent = ''
    workers.textContent = ''

    function findBestRestaurant() {
        let bestRestaurant = null
        let bestSum = null

        for (let restaurant in restaurantInfo) {
            const salary = Object.values(restaurantInfo[restaurant]).map(Number)
            const avrSalary = salary.reduce((sum, num) => sum + num, 0) / salary.length
            if (bestSum === null || avrSalary > bestSum) {
                bestSum = avrSalary
                bestRestaurant = restaurant;
            }
        }
        return bestRestaurant
    }


    function createWorkers(restaurant, workers) {
        workers.split(', ').map(x => {
            let [name, salary] = x.split(' ')
            restaurantInfo[restaurant][name] = parseInt(salary)
        })
    }

    function onClick() {
        let list = Array.from(JSON.parse(input.value))
        list.forEach(x => {
            let [name, workers] = x.split(' - ')
            if (!restaurantInfo.hasOwnProperty(name)) {
                restaurantInfo[name] = {}
            }
            createWorkers(name, workers)
        })
        const bestRest = findBestRestaurant()
        const salary = Object.values(restaurantInfo[bestRest]).map(Number)
        bestRestaurant.textContent = `Name: ${bestRest} Average Salary: ${(salary.reduce((sum, num) => sum + num, 0) / salary.length).toFixed(2)} Best Salary: ${Math.max(...salary).toFixed(2)}`
        let sortedWorkers = Object.entries(restaurantInfo[bestRest])
            .sort((a, b) => b[1] - a[1])
            .reduce((obj, [key, value]) => ({...obj, [key]: value}), {})

        for (const key in sortedWorkers) {
            workers.textContent += `Name: ${key} With Salary: ${sortedWorkers[key]} `

        }
        console.log(restaurantInfo[bestRest])
    }
}
