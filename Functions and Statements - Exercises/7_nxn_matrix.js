

function solve(range){
    for (let i = 0; i < range; i++){
        for (let i = 0; i < range; i++){
            process.stdout.write(`${range} `);
        }
        console.log()
    }
}

solve(7)