function create(list) {
    const content = document.getElementById("content");
    for (let i = 0; i < list.length; i++) {
        const div = document.createElement('div')
        const p = document.createElement("p")
        p.textContent = list[i]
        p.style.display = "none"
        div.appendChild(p)
        div.addEventListener("click", () => {
            p.style.display = "block"
        })
        content.appendChild(div)
    }
}
