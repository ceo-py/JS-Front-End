function solve(list) {
    let neededThickness = list[0];

    for (let i = 1; i < list.length; i++) {
        let currentThickness = list[i];

        console.log(`Processing chunk ${currentThickness} microns`);

        let cut = (number) => number / 4;
        let lap = (number) => number - number * 0.2;
        let grind = (number) => number - 20;
        let etch = (number) => number - 2;
        let xray = (number) => number + 1;

        let cutCount = 0;
        let lapCount = 0;
        let grindCount = 0;
        let etchCount = 0;

        while (currentThickness !== neededThickness) {
            while (currentThickness / 4 >= neededThickness) {
                currentThickness = cut(currentThickness);
                cutCount += 1;
            }
            if (cutCount > 0) {
                console.log(`Cut x${cutCount}`);
                console.log(`Transporting and washing`);
                currentThickness = Math.floor(currentThickness);
            }

            while (currentThickness - currentThickness * 0.2 >= neededThickness) {
                currentThickness = lap(currentThickness);
                lapCount += 1;
            }
            if (lapCount > 0) {
                console.log(`Lap x${lapCount}`);
                console.log(`Transporting and washing`);
                currentThickness = Math.floor(currentThickness);
            }

            while (currentThickness - 20 >= neededThickness) {
                currentThickness = grind(currentThickness);
                grindCount += 1;
            }
            if (grindCount > 0) {
                console.log(`Grind x${grindCount}`);
                console.log(`Transporting and washing`);
                currentThickness = Math.floor(currentThickness);
            }

            while (currentThickness - 2 >= neededThickness - 1) {
                currentThickness = etch(currentThickness);
                etchCount += 1;
            }
            if (etchCount > 0) {
                console.log(`Etch x${etchCount}`);
                console.log(`Transporting and washing`);
                currentThickness = Math.floor(currentThickness);
            }

            if (currentThickness < neededThickness) {
                currentThickness = xray(currentThickness);
                console.log(`X-ray x1`);
            }
        }
        console.log(`Finished crystal ${neededThickness} microns`);
    }
}