function solve() {
  let correctAnswers = ["onclick", "JSON.stringify()", "A programming API for HTML and XML documents"]
  let rightAnswered = 0
  let index = 0

  Array
    .from(document.querySelectorAll(".answer-text"))
    .map((x) => x.addEventListener("click", e => {

      if (correctAnswers.includes(e.target.textContent)) {
        rightAnswered += 1
      }

      let currSection = document.querySelectorAll("section")[index];
      currSection.style.display = "none";

      if (document.querySelectorAll("section")[index + 1] !== undefined) {
        let nextSection = document.querySelectorAll("section")[index + 1]
        nextSection.style.display = "block"
        index += 1
      } else {
        document.querySelector("#results").style.display = "block";
        if (rightAnswered !== 3) {
          document.querySelector("#results h1").textContent = `You have ${rightAnswered} right answers`
        } else {
          document.querySelector("#results h1").textContent = "You are recognized as top JavaScript fan!"
        }
      }
    }))
}