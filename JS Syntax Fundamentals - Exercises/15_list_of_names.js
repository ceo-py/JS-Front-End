function solve(list){
    list.sort((a, b) => a.localeCompare(b))
    // for (let i=0; i < list.length; i++){
    //     console.log(`${i + 1}.${list[i]}`)
    // }

    let index = 1;
    for (const name of list) {
        console.log(`${index}.${name}`);
        index++;
  }

    // console.log(list.sort((a, b) => a.localeCompare(b)).map((name, index) => `${index + 1}.${name}`).join("\n"));
}


solve(["John", "Bob", "Christina", "Ema"])
