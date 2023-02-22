function solve(length) {
  const symbols = "ATCGTTAGGG";
  let index = 0;
  for (let i = 0; i < length; i++) {
    if (i % 4 === 0) {
      console.log(`**${symbols[index % symbols.length]}${symbols[(index + 1) % symbols.length]}**`);
    } else if (i % 4 === 1 || i % 4 === 3) {
      console.log(`*${symbols[index % symbols.length]}--${symbols[(index + 1) % symbols.length]}*`);
    } else if (i % 4 === 2) {
      console.log(`${symbols[index % symbols.length]}----${symbols[(index + 1) % symbols.length]}`);
    }
    index += 2;
  }
}



solve(10)
