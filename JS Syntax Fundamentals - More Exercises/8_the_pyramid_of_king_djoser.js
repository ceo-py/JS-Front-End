function Pyramid(base, increment) {

    let totalStone = 0;
    let totalMarble = 0;
    let totalLapis = 0;
    let totalGold = 0;
    let row = 0;
    let currentBase = base;

    while (currentBase > 2) {
        let marbel = currentBase * 4 - 4;
        let stone = currentBase * currentBase - marbel;
        totalStone += stone;

        row += 1;
        if (row % 5 === 0) {
            totalLapis += marbel;
        } else {
            totalMarble += marbel;
        }
        currentBase -= 2;
    }
    row += 1;
    let gold = currentBase * currentBase;

    console.log(`Stone required: ${Math.ceil(totalStone * increment)}`);
    console.log(`Marble required: ${Math.ceil(totalMarble * increment)}`);
    console.log(`Lapis Lazuli required: ${Math.ceil(totalLapis * increment)}`);
    console.log(`Gold required: ${Math.ceil(gold * increment)}`);
    console.log(`Final pyramid height: ${Math.floor(row * increment)}`);

}

Pyramid(11, 1)