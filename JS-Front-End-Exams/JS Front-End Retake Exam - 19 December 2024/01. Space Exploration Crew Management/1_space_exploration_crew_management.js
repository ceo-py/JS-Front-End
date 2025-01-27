function spaceExplorationCrewManagement(args) {
  const crew = {};
  const totalCrewMembers = Number(args.shift());

  for (let i = 0; i < totalCrewMembers; i++) {
    const [name, section, skills] = args.shift().split(" ");
    crew[name] = { spacecraftSection: section, skills: skills.split(",") };
  }

  const commands = {
    Perform: (name, section, skill) => {
      const astronaut = crew[name];
      return astronaut.spacecraftSection === section && astronaut.skills.includes(skill)
        ? `${name} has successfully performed the skill: ${skill}!`
        : `${name} cannot perform the skill: ${skill}.`;
    },
    Transfer: (name, newSection) => {
      crew[name].spacecraftSection = newSection;
      return `${name} has been transferred to: ${newSection}`;
    },
    "Learn Skill": (name, skill) => {
      if (crew[name].skills.includes(skill)) {
        return `${name} already knows the skill: ${skill}.`;
      }
      crew[name].skills.push(skill);
      return `${name} has learned a new skill: ${skill}.`;
    }
  };

  let command = args.shift();
  while (command !== "End") {
    const [action, ...params] = command.split(" / ");
    console.log(commands[action](...params));
    command = args.shift();
  }

  for (const name in crew) {
    const { spacecraftSection, skills } = crew[name];
    console.log(`Astronaut: ${name}, Section: ${spacecraftSection}, Skills: ${skills.sort().join(', ')}`);
  }
}










// function spaceExplorationCrewManagement(args) {
//   const [totalCrewMembers, crew] = [Number(args.shift()), {}];
//
//   for (let i = 0; i < totalCrewMembers; i++) {
//     const [astronautName, spacecraftSection, knowingSkills] = args
//       .shift()
//       .split(" ");
//     crew[astronautName] = {
//       spacecraftSection,
//       skills: knowingSkills.split(","),
//     };
//   }
//
//   const commands = {
//     Perform(astronautName, spacecraftSection, skill) {
//       const astronaut = crew[astronautName];
//       let output = `${astronautName} cannot perform the skill: ${skill}.`;
//       if (
//         astronaut.spacecraftSection === spacecraftSection &&
//         astronaut.skills.includes(skill)
//       ) {
//         output = `${astronautName} has successfully performed the skill: ${skill}!`;
//       }
//       return output;
//     },
//     Transfer(astronautName, newSpacecraftSection) {
//       crew[astronautName].spacecraftSection = newSpacecraftSection;
//       return `${astronautName} has been transferred to: ${newSpacecraftSection}`;
//     },
//     "Learn Skill"(astronautName, newSkill) {
//       const astronaut = crew[astronautName];
//       let output = `${astronautName} already knows the skill: ${newSkill}.`;
//       if (!astronaut.skills.includes(newSkill)) {
//         output = `${astronautName} has learned a new skill: ${newSkill}.`;
//         astronaut.skills.push(newSkill);
//       }
//       return output;
//     },
//   };
//   let commandToexecute = args.shift();
//
//   while (commandToexecute !== "End") {
//
//
//     const [command, ...argsFunction] = commandToexecute.split(" / ");
//     console.log(commands[command](...argsFunction));
//     commandToexecute = args.shift();
//   }
//   Object.keys(crew).forEach(crewName => {
//     const austronaut = crew[crewName];
//     console.log(`Astronaut: ${crewName}, Section: ${austronaut.spacecraftSection}, Skills: ${austronaut.skills.sort().join(', ')}`)
//   })
// }

spaceExplorationCrewManagement([
  "2",
  "Alice command_module piloting,communications",
  "Bob engineering_bay repair,maintenance",
  "Perform / Alice / command_module / piloting",
  "Perform / Bob / command_module / repair",
  "Learn Skill / Alice / navigation",
  "Perform / Alice / command_module / navigation",
  "Transfer / Bob / command_module",
  "Perform / Bob / command_module / maintenance",
  "End",
]);
