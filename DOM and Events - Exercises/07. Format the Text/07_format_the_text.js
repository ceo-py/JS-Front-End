function solve() {
    let text = document.getElementById("input").value.split(".").filter(e => e)
    let output = [];

    for (i = 0; i < text.length; i++) {
        let sentence = text[i]
        if (sentence.length > 0) {
            if (i % 3 === 0 && i !== text.length - 1) {
                output.push("<p>" + sentence + ".")
            } else if (i % 3 === 1 && i !== text.length - 1) {
                output.push(sentence + ".")
            } else if (i % 3 === 2 && i !== text.length - 1) {
                output.push(sentence + "." + "</p>")
            } else {
                if ((i % 3 === 0) && i === text.length - 1) {
                    output.push("<p>" + sentence + "." + "</p>")
                } else {
                    output.push(sentence + "." + "</p>")
                }
            }
        }
    }
    document.getElementById("output").innerHTML = output.join(" ")
}




//
//
// function solve() {
//     let textArea = document.querySelector('#input')
//     let output = document.querySelector('#output')
//
//     function createP(data) {
//         console.log(data)
//         const p = document.createElement('p')
//         p.textContent = data.join('.')
//         return p
//     }
//
//     const list = textArea.value.split('.').filter(e => e)
//     console.log(list)
//     let text = []
//     list.forEach(x => {
//         if (x.length > 0) {
//             text.push(`${x}`)
//             if (text.length === 3) {
//                 text[2] += '.'
//                 output.appendChild(createP(text))
//                 text = []
//             }
//         }
//     })
//     output.appendChild(createP(text))
//
// }
//
//
//
//
// function solve() {
//     let text = document.getElementById("input").value.split(".").filter(e => e.length > 0)
//     let div = document.getElementById("output");
//     for (i = 0; i < text.length; i += 3) {
//         let output = [];
//         for (j = 0; j < 3; j++) {
//             if (text[i + j]) {
//                 output.push(text[i + j])
//             }
//         }
//         let res = output.join(". ") + "."
//         div.innerHTML += `<p>${res}</p>`
//     }
// }
//
// function solve() {
//     let text = document.getElementById("input").value.split(".").filter(e => e)
//     let output = [];
//
//     for (i = 0; i < text.length; i++) {
//         let sentence = text[i]
//         if (sentence.length > 0) {
//             if (i % 3 === 0 && i !== text.length - 1) {
//                 output.push("<p>" + sentence + ".")
//             } else if (i % 3 === 1 && i !== text.length - 1) {
//                 output.push(sentence + ".")
//             } else if (i % 3 === 2 && i !== text.length - 1) {
//                 output.push(sentence + "." + "</p>")
//             } else {
//                 if ((i % 3 === 0) && i === text.length - 1) {
//                     output.push("<p>" + sentence + "." + "</p>")
//                 } else {
//                     output.push(sentence + "." + "</p>")
//                 }
//             }
//         }
//     }
//     document.getElementById("output").innerHTML = output.join(" ")
// }
//
