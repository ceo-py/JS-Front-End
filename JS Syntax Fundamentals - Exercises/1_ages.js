function solve(age) {
    let output = null
    if(age < 0)  output = 'out of bounds'
    else if (age <= 2)  output = 'baby'
    else if (age <= 13) output = 'child'
    else if (age <= 19) output = 'teenager'
    else if (age <= 65) output = 'adult'
    else if (age >= 66) output = 'elder'
    console.log(output)
}



// function solve(age) {
//     let output = 'out of bounds';
//     if (age >= 0 && age <= 2) {
//         output = 'baby';
//     } else if (age >= 3 && age <= 13) {
//         output = 'child';
//     } else if (age >= 14 && age <= 19) {
//         output = 'teenager';
//     } else if (age >= 20 && age <= 65) {
//         output = 'adult';
//     } else if (age >= 66) {
//         output = 'elder';
//     }
//     console.log(output)
// }

solve(100)