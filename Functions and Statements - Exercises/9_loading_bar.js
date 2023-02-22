function solve(num) {
  let num_range = Math.floor(num / 10);
  let target = 10;
  if (target === num_range) {
    console.log("100% Complete!\n" + "[" + "%".repeat(target) + "]");
  } else {
    console.log(`${num}% [${"%".repeat(num_range)}${".".repeat(target - num_range)}]\nStill loading...`);
  }
}

solve(30)
