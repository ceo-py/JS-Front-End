

function solve (number, ...commands){
    number = parseInt(number)

    for (let i = 0; i < commands.length; i++){
        if (commands[i] === 'chop'){
            number /= 2
        } else if (commands[i] === 'dice'){
            number = Math.sqrt(number)
        } else if (commands[i] === 'spice'){
            number += 1
        } else if (commands[i] === 'bake'){
            number *= 3
        } else if (commands[i] === 'fillet'){
            number *= 0.80
        }
        console.log(number)
    }
}


solve ('32', 'chop', 'chop', 'chop', 'chop', 'chop')
solve ('9', 'dice', 'spice', 'chop', 'bake', 'fillet')