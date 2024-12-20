function farmManagementSystem(input) {
  const n = Number(input.shift());
  const [farmers, farmersToAdd, commandsToExecute] = [
    {},
    input.slice(0, n),
    input.slice(n),
  ];
  const commands = {
    Execute(name, workArea, task) {
      return farmers[name].workArea === workArea && farmers[name].tasks.includes(task)
        ? `${name} has executed the task: ${task}!`
        : `${name} cannot execute the task: ${task}.`;
    },
    "Change Area"(name, newWorkArea) {
      farmers[name].workArea = newWorkArea;
      return `${name} has changed their work area to: ${newWorkArea}`;
    },
    "Learn Task"(name, newTask) {
      if (farmers[name].tasks.includes(newTask)) {
        return `${name} already knows how to perform ${newTask}.`;
      }
      farmers[name].tasks.push(newTask);
      return `${name} has learned a new task: ${newTask}.`;
    },
  };

  farmersToAdd.forEach((farmer) => {
    const [name, workArea, tasks] = farmer
      .split(" ")
      .map((el, i) => (i === 2 ? el.split(",") : el));
    farmers[name] = {
      workArea,
      tasks,
    };
  });
  let commandString = commandsToExecute.shift();
  while (commandString !== "End") {
    const [command, ...args] = commandString.split(" / ");
    console.log(commands[command](...args));
    commandString = commandsToExecute.shift();
  }

  Object.entries(farmers).forEach(([name, details]) => {
    console.log(
      `Farmer: ${name}, Area: ${details.workArea}, Tasks: ${details.tasks
        .sort()
        .join(", ")}`
    );
  });
}

farmManagementSystem([
  "2",
  "John garden watering,weeding",
  "Mary barn feeding,cleaning",
  "Execute / John / garden / watering",
  "Execute / Mary / garden / feeding",
  "Learn Task / John / planting",
  "Execute / John / garden / planting",
  "Change Area / Mary / garden",
  "Execute / Mary / garden / cleaning",
  "End",
]);
