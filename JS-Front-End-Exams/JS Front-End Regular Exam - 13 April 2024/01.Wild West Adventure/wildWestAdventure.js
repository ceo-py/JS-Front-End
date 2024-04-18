function widlWestAdventure(input) {
  const [totalHeroes, heroes] = [Number(input.shift()), {}];
  for (let index = 0; index < totalHeroes; index++) {
    const [name, health, bullets] = input
      .shift()
      .split(" ")
      .map((x) => (isNaN(x) ? x : Number(x)));
    heroes[name] = { health, bullets };
  }

  const commands = {
    FireShot: (name, target) => {
      if (heroes[name].bullets > 0) {
        // heroes[name].bullets -= 1;
        heroes[name].bullets--;
        return `${name} has successfully hit ${target} and now has ${heroes[name].bullets} bullets!`;
      }
      return `${name} doesn't have enough bullets to shoot at ${target}!`;
    },
    TakeHit: (name, damage, attacker) => {
      heroes[name].health -= damage;
      if (heroes[name].health <= 0) {
        delete heroes[name];
        return `${name} was gunned down by ${attacker}!`;
      }
      return `${name} took a hit for ${damage} HP from ${attacker} and now has ${heroes[name].health} HP!`;
    },
    Reload: (name) => {
      const reloadingBullets = 6 - heroes[name].bullets;
      if (reloadingBullets !== 0) {
        heroes[name].bullets = 6;
        return `${name} reloaded ${reloadingBullets} bullets!`;
      }
      return `${name}'s pistol is fully loaded!`;
    },
    PatchUp: (name, amount) => {
      heroes[name].health += amount;
      if (heroes[name].health > 100) {
        heroes[name].health = 100;
        return `${name} is in full health!`;
      }
      return `${name} patched up and recovered ${amount} HP!`;
    },
  };
  let initialInput = input.shift();

  while (initialInput !== "Ride Off Into Sunset") {
    // const [command, [arg1, arg2, arg3]] = initialInput
    const [command, ...args] = initialInput
      .split(" - ")
      .map((x) => (isNaN(x) ? x : Number(x)));
    // commands[command](arg1, arg2, arg3);
    console.log(commands[command](...args));
    initialInput = input.shift();
  }
  for (const hero in heroes) {
    console.log(
      `${hero}\n HP: ${heroes[hero].health}\n Bullets: ${heroes[hero].bullets}`
    );
  }
}

// widlWestAdventure([
//   "2",
//   "Gus 100 0",
//   "Walt 100 6",
//   "FireShot - Gus - Bandit",
//   "TakeHit - Gus - 100 - Bandit",
//   "Reload - Walt",
//   "Ride Off Into Sunset",
// ]);

// widlWestAdventure([
//   "2",
//   "Jesse 100 4",
//   "Walt 100 5",
//   "FireShot - Jesse - Bandit",
//   "TakeHit - Walt - 30 - Bandit",
//   "PatchUp - Walt - 20",
//   "Reload - Jesse",
//   "Ride Off Into Sunset",
// ]);

// widlWestAdventure([
//   "2",
//   "Gus 100 4",
//   "Walt 100 5",
//   "FireShot - Gus - Bandit",
//   "TakeHit - Walt - 100 - Bandit",
//   "Reload - Gus",
//   "Ride Off Into Sunset",
// ]);









// function wildWestAdventure(input) {
//   const [totalHeroes, heroes] = [Number(input.shift()), {}];
//   for (let i = 0; i < totalHeroes; i++) {
//     const [name, health, bullets] = input
//       .shift()
//       .split(" ")
//       .map((x) => (isNaN(x) ? x : Number(x)));
//     heroes[name] = { health, bullets };
//   }
//   const commands = {
//     FireShot: (name, target) => {
//       if (heroes[name].bullets > 0) {
//         heroes[name].bullets--;
//         return `${name} has successfully hit ${target} and now has ${heroes[name].bullets} bullets!`;
//       }
//       return `${name} doesn't have enough bullets to shoot at ${target}!`;
//     },
//     TakeHit: (name, damage, attacker) => {
//       heroes[name].health -= damage;
//       if (heroes[name].health <= 0) {
//         delete heroes[name];
//         return `${name} was gunned down by ${attacker}!`;
//       }
//       return `${name} took a hit for ${damage} HP from ${attacker} and now has ${heroes[name].health} HP!`;
//     },
//     Reload: (name) => {
//       const reloadingBullets = 6 - heroes[name].bullets;
//       if (reloadingBullets !== 0) {
//         heroes[name].bullets = 6;
//         return `${name} reloaded ${reloadingBullets} bullets!`;
//       }
//       return `${name}'s pistol is fully loaded!`;
//     },
//     PatchUp: (name, amount) => {
//       heroes[name].health += amount;
//       if (heroes[name].health > 100) {
//         heroes[name].health = 100;
//         return `${name} is in full health!`;
//       }
//       return `${name} patched up and recovered ${amount} HP!`;
//     },
//   };
//   initialInput = input.shift();
//   while (initialInput !== "Ride Off Into Sunset") {
//     const [command, ...params] = initialInput
//       .split(" - ")
//       .map((x) => (isNaN(x) ? x : Number(x)));
//     console.log(commands[command](...params));
//     initialInput = input.shift();
//   }
//   for (const hero in heroes) {
//     console.log(
//       `${hero}\n HP: ${heroes[hero].health}\n Bullets: ${heroes[hero].bullets}`
//     );
//   }
// }
//
