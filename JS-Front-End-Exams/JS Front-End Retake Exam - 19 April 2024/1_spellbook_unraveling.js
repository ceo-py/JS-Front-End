function spellBookUnravelling(params) {
    let [initialString, commandData] = [params.shift(), params.shift()];

    const commands = {
      RemoveEven: () => {
        initialString = initialString
          .split("")
          .filter((x, i) => i % 2 === 0)
          .join("");
        return initialString;
      },
      TakePart: (fromIndex, toIndex) => {
        initialString = initialString.slice(fromIndex, toIndex);
        return initialString;
      },
      Reverse: (substring) => {
        if (initialString.includes(substring)) {
          initialString = initialString.replace(substring, "");
          initialString += substring.split("").reverse().join("");
          return initialString;
        }
        return "Error";
      },
    };

    while (commandData !== "End") {
      const [command, ...args] = commandData.split("!");
      console.log(commands[command](...args));
      commandData = params.shift();
    }
    console.log(`The concealed spell is: ${initialString}`);
  }
  spellBookUnravelling([
    "asAsl2adkda2mdaczsa",
    "RemoveEven",
    "TakePart!1!9",
    "Reverse!maz",
    "End",
  ]);

  spellBookUnravelling([
    "hZwemtroiui5tfone1haGnanbvcaploL2u2a2n2i2m",
    "TakePart!31!42",
    "RemoveEven",
    "Reverse!anim",
    "Reverse!sad",
    "End",
  ]);
