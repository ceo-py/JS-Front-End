function solve(list) {
    class Cat {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        meow() {
            console.log(`${this.name}, age ${this.age} says Meow`)
        }
    }
    for (let item of list){
        let [name, age] = item.split(' ')
        let catObj = new Cat(name, age)
        catObj.meow()
    }
}

solve(['Mellow 2', 'Tom 5'])