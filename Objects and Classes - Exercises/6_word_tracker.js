function solve(list) {
    Object.entries(list.shift().split(' ')
        .reduce((dict, item) => (dict[item] = list.filter(x=> x === item).length, dict), {}))
        .sort((x, y) => y[1] - x[1])
        .forEach(x => console.log(`${x[0]} - ${x[1]}`))
}


// function solve(arr) {
//   const [wordsToFind, ...words] = arr;
//   const dict = {};
//
//   for (const word of wordsToFind.split(" ")) {
//     dict[word] = 0;
//   }
//
//   for (const sentence of words) {
//     for (const word of sentence.split(" ")) {
//       if (word in dict) {
//         dict[word] += 1;
//       }
//     }
//   }
//   for (const [word, count] of Object.entries(dict).sort((a, b) => b[1] - a[1])) {
//     console.log(`${word} - ${count}`);
//   }
// }


solve([
    'this sentence',
    'In', 'this', 'sentence', 'you', 'have', 'to', 'count', 'the', 'occurrences', 'of', 'the', 'words', 'this', 'and', 'sentence', 'because', 'this', 'is', 'your', 'task'
])

