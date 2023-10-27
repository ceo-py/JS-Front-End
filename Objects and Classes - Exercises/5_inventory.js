function solve(list) {
    list.map(x => {
        const [name, level, items] = x.split(' / ')
        return {name, level, items,
        show: () => {
            return `Hero: ${name}\nlevel => ${level}\nitems => ${items}`
        }}})
        .sort((a, b) => a.level - b.level)
        .forEach(x => console.log(x.show()))
}


// function solve(list) {
//     let heroes = []
//     for (item of list) {
//         let [name, level, items] = item.split(' / ')
//         const hero = {
//             name: name,
//             level: parseInt(level),
//             items: items,
//             printData: function () {
//                 console.log(`Hero: ${this.name}\nlevel => ${this.level}\nitems => ${this.items}`)
//             }
//         }
//         heroes.push(hero)
//     }
//     heroes.sort((a, b) => parseInt(a.level) - parseInt(b.level))
//     for (item of heroes){
//         item.printData()
//     }
// }

solve([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'
])