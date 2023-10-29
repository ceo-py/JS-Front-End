function deleteByEmail() {
    const table = [...document.querySelectorAll('tbody tr')]
    const email = document.querySelector('input[type="text"]')
    const result = document.querySelector('#result')
    result.textContent = 'Not found.'
    table.forEach(x => [...x.querySelectorAll('td')][1].textContent === email.value? [x.remove(),result.textContent = 'Deleted.']: null)
    email.value = ''
}






// function deleteByEmail() {
//     const email = document.getElementsByName("email")[0].value
//     const table = document.getElementById("customers")
//     let text = "Not found."
//
//     for (let i = 1; i < table.rows.length; i++) {
//         const row = table.rows[i]
//         if (row.cells[1].textContent === email) {
//             table.deleteRow(i)
//             text = "Deleted."
//             break
//         }
//     }
//     document.getElementById("result").textContent = text
//     document.getElementsByName("email")[0].value = ""
// }

