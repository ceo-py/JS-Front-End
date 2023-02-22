

function solve(list){
    let userName = list.shift()
    for (let i=0; i < list.length; i++){
        if (userName === list[i].split("").reverse().join("")){
            console.log(`User ${userName} logged in.`)
            break
        } else {
            if (i === 3){
            console.log(`User ${userName} blocked!`)
            break
        }
            console.log('Incorrect password. Try again.')
        }
    }
}


solve(['momo','omom'])