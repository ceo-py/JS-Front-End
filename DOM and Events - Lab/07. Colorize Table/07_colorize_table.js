function colorize() {
    [...document.querySelectorAll('tr')].map((x , i) => i % 2 !== 0 ? x.style.backgroundColor = 'Teal': '')
}


// function colorize() {
//     const table = document.querySelector('table').rows
//     for (i = 0; i < table.length; i++) {
//         if (i % 2 !== 0) {
//             table[i].style.backgroundColor = 'Teal'
//         }
//     }
// }
    