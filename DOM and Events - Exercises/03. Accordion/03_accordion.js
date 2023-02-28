function toggle() {
    const extra = document.querySelector("#extra")
    const button = document.querySelector(".button")

    if (extra.style.display === "none") {
        extra.style.display = "block"
        button.textContent = "Less"
    } else {
        extra.style.display = "none"
        button.textContent = "More"
    }
}
