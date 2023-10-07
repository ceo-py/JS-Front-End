function solve() {
    const answers = ['onclick', 'JSON.stringify()', 'A programming API for HTML and XML documents']
    let correctAnswers = 0
    let answeredQuestion = 0
    const quize = {
        questions: Array.from(document.querySelectorAll('p')),
        result: document.querySelector('.results-inner > h1')
    }
    const whatIsClicked = (e) => {
        answeredQuestion += 1
        const selection = e.currentTarget.parentElement.parentElement.parentElement.parentElement
        const clickedAnswer = e.currentTarget.textContent
        if (answers.includes(clickedAnswer)) correctAnswers += 1
        selection.style.display = "none"
        selection.nextElementSibling.style.display = "block"
        if (answeredQuestion !== 3) return
        quize.result.parentElement.parentElement.style.display = 'block'
        quize.result.textContent = correctAnswers === 3 ? 'You are recognized as top JavaScript fan!'
                                                        : `You have ${correctAnswers} right answers`
    }
    quize.questions.forEach(p => {
        p.addEventListener('click', whatIsClicked)
    })
}






// function solve() {
//   let correctAnswers = ["onclick", "JSON.stringify()", "A programming API for HTML and XML documents"]
//   let rightAnswered = 0
//   let index = 0
//
//   Array
//     .from(document.querySelectorAll(".answer-text"))
//     .map((x) => x.addEventListener("click", e => {
//
//       if (correctAnswers.includes(e.target.textContent)) {
//         rightAnswered += 1
//       }
//
//       let currSection = document.querySelectorAll("section")[index];
//       currSection.style.display = "none";
//
//       if (document.querySelectorAll("section")[index + 1] !== undefined) {
//         let nextSection = document.querySelectorAll("section")[index + 1]
//         nextSection.style.display = "block"
//         index += 1
//       } else {
//         document.querySelector("#results").style.display = "block";
//         if (rightAnswered !== 3) {
//           document.querySelector("#results h1").textContent = `You have ${rightAnswered} right answers`
//         } else {
//           document.querySelector("#results h1").textContent = "You are recognized as top JavaScript fan!"
//         }
//       }
//     }))
// }