function deleteByEmail() {
    const email = document.getElementsByName("email")[0].value
    const table = document.getElementById("customers")
    let text = "Not found."

    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i]
        if (row.cells[1].textContent === email) {
            table.deleteRow(i)
            text = "Deleted."
            break
        }
    }
    document.getElementById("result").textContent = "Not found."
    document.getElementsByName("email")[0].value = ""
}

