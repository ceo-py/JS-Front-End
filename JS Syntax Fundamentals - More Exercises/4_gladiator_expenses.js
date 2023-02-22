

function solve(lostFights, helmetPrice, swordPrice, shieldPrice, armorPrice){
    let helmetRepair = 0;
    let swordRepair = 0;
    let shieldRepair = 0;
    let armorRepair = 0;
    let shieldInRow = 0;

    for (let i = 1; i < lostFights + 1; i ++) {
        if (i % 2 === 0){
            helmetRepair += 1;
        }
        if (i % 3 === 0){
            swordRepair += 1;
        }
        if (i % 3 === 0 && i % 2 === 0){
            shieldRepair += 1;
            shieldInRow += 1;
            if (shieldInRow === 2){
                shieldInRow = 0;
                armorRepair += 1;
            }
        }
    }
    console.log(`Gladiator expenses: ${((helmetRepair * helmetPrice) + (swordRepair * swordPrice) + (shieldRepair * shieldPrice) + (armorRepair * armorPrice)).toFixed(2)} aureus`)
}


solve(23,
12.50,
21.50,
40,
200)