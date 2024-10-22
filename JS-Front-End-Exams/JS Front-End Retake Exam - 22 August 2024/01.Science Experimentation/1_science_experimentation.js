function scienceExperimentation(input) {
  const [totalChemicals, labChemical] = [Number(input.shift()), {}];
  input.slice(0, totalChemicals).forEach((c, i) => {
    const [elementName, elementQuantity] = c
      .split(" # ")
      .map((x) => (isNaN(x) ? x : Number(x)));
    labChemical[elementName] = { amount: elementQuantity };
    input.shift();
  });
  const commands = {
    Mix: (chemicalOne, chemicalTwo, amount) => {
      // if (labChemical[chemicalOne].amount < amount || labChemical[chemicalTwo].amount < amount)
      const currentChemical = [chemicalOne, chemicalTwo];
      if (currentChemical.some((c) => labChemical[c].amount < amount)) {
        return `Insufficient quantity of ${chemicalOne}/${chemicalTwo} to mix.`;
      }
      //   labChemical[chemicalOne].amount -= amount
      //   labChemical[chemicalTwo].amount -= amount
      currentChemical.forEach((c) => (labChemical[c].amount -= amount));
      return `${chemicalOne} and ${chemicalTwo} have been mixed. ${amount} units of each were used.`;
    },
    Replenish: (chemicalName, amount) => {
      if (!labChemical.hasOwnProperty(chemicalName)) {
        return `The Chemical ${chemicalName} is not available in the lab.`;
      }
      if (labChemical[chemicalName].amount + amount > 500) {
        const addedAmount = 500 - labChemical[chemicalName].amount;
        labChemical[chemicalName].amount = 500;
        return `${chemicalName} quantity increased by ${addedAmount} units, reaching maximum capacity of 500 units!`;
      }
      labChemical[chemicalName].amount += amount;
      return `${chemicalName} quantity increased by ${amount} units!`;
    },
    "Add Formula": (chemicalName, formula) => {
      if (!labChemical.hasOwnProperty(chemicalName)) {
        return `The Chemical ${chemicalName} is not available in the lab.`;
      }
      labChemical[chemicalName]["formula"] = formula;
      return `${chemicalName} has been assigned the formula ${formula}.`;
    },
  };
  let command_data = input.shift();
  while (command_data !== "End") {
    const [command, ...data] = command_data
      .split(" # ")
      .map((i) => (isNaN(i) ? i : Number(i)));
    console.log(commands[command](...data));
    command_data = input.shift();
  }
  Object.keys(labChemical).forEach((c) => {
    const [quantity, formula] = [
      labChemical[c].amount,
      labChemical[c]?.formula,
    ];
    const details =
      `Quantity: ${quantity}` + (formula ? `, Formula: ${formula}` : "");
    console.log(`Chemical: ${c}, ${details}`);
  });
}


scienceExperimentation(['4',
  'Water # 200',
  'Salt # 100',
  'Acid # 50',
  'Base # 80',
  'Mix # Water # Salt # 50',
  'Replenish # Salt # 550',
  'Add Formula # Acid # H2SO4',
  'End'])