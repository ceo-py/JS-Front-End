function solve(password) {
    let output = [];

    if (password.length <= 5 || password.length > 10) output.push("Password must be between 6 and 10 characters")

    if (!/^[a-zA-Z0-9]+$/.test(password)) output.push("Password must consist only of letters and digits")

    if (!/\d.*\d/.test(password)) output.push("Password must have at least 2 digits")

    console.log(output.length > 0 ? `${output.join('\n')}` : 'Password is valid')
}

solve('Pa$s$s')




// function solve(password) {
//     let output = [];
//
//     if (password.length <= 5 || password.length > 10) {
//         output.push("Password must be between 6 and 10 characters")
//     }
//     if (!/^[a-zA-Z0-9]+$/.test(password)) {
//         output.push("Password must consist only of letters and digits")
//     }
//     if (!/\d.*\d/.test(password)) {
//         output.push("Password must have at least 2 digits")
//     }
//     if (output.length > 0) {
//         console.log(`${output.join('\n')}`)
//     } else {
//         console.log('Password is valid')
//     }
// }
//
// solve('Pa$s$s')




//
// function solve(password) {
//     let output = [];
//
//     function checkLetterAndNumbers(text) {
//         let [valid, numbers] = [true, 0]
//         for (let i = 0; i < text.length; i++) {
//             let symbol = text.charCodeAt(i);
//             if (!(symbol >= 48 && symbol <= 57) && !(symbol >= 65 && symbol <= 90) && !(symbol >= 97 && symbol <= 122)) {
//                 valid = false;
//             }
//             if (symbol >= 48 && symbol <= 57) {
//                 numbers++;
//             }
//         }
//
//         return [valid, numbers];
//
//     }
//
//     let [valid, numbers] = checkLetterAndNumbers(password)
//
//     if (password.length <= 5 || password.length > 10) {
//         output.push("Password must be between 6 and 10 characters")
//     }
//     if (!valid) {
//         output.push("Password must consist only of letters and digits")
//     }
//     if (numbers < 2) {
//         output.push("Password must have at least 2 digits")
//     }
//     if (output.length > 0) {
//         console.log(`${output.join('\n')}`)
//     } else {
//         console.log('Password is valid')
//     }
// }
//
