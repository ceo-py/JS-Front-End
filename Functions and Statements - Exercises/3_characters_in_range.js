
function solve(charOne, charTwo){
    if (charOne > charTwo){
        let temp = charOne;
        charOne = charTwo;
        charTwo = temp;
    }
    let output = [];

    for (let i = charOne.charCodeAt(0) + 1; i < charTwo.charCodeAt(0); i ++){
        output.push(String.fromCharCode(i))
    }
    console.log(output.join(' '))
}

solve('#',
':')