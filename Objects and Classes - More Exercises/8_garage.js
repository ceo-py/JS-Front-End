function solve(list) {
    garage = {}
    for (carIndo of list) {
        parts = carIndo.split(" - ")
        garageNum = parts[0]
        if (!garage.hasOwnProperty(garageNum)) {
            garage[garageNum] = {}
            garage[garageNum].cars = []
        }
        obj = {}
        parts[1].split(", ").forEach(pair => {
            const [key, value] = pair.split(": ")
            obj[key] = value
        })
        garage[garageNum].cars.push(obj)
    }
    for (key in garage) {
        console.log(`Garage № ${key}`)
        cars = garage[key].cars
        for (car of cars) {
            const properties = []
            for (property in car) {
                properties.push(`${property} - ${car[property]}`)
            }
            console.log(`--- ${properties.join(', ')}`)
        }

    }
}

solve(['1 - color: blue, fuel type: diesel', '1 - color: red, manufacture: Audi', '2 - fuel type: petrol', '4 - color: dark blue, fuel type: diesel, manufacture: Fiat'])