function wildWestAdventure(input) {
  const [totalHeroes, heroes] = [Number(input.shift()), {}];
  for (let i = 0; i < totalHeroes; i++) {
    const [name, health, bullets] = input
      .shift()
      .split(" ")
      .map((x) => (isNaN(x) ? x : Number(x)));
    heroes[name] = { health, bullets };
  }
  const commands = {
    FireShot: (name, target) => {
      if (heroes[name].bullets > 0) {
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
  initialInput = input.shift();
  while (initialInput !== "Ride Off Into Sunset") {
    const [command, ...params] = initialInput
      .split(" - ")
      .map((x) => (isNaN(x) ? x : Number(x)));
    console.log(commands[command](...params));
    initialInput = input.shift();
  }
  for (const hero in heroes) {
    console.log(
      `${hero}\n HP: ${heroes[hero].health}\n Bullets: ${heroes[hero].bullets}`
    );
  }
}

