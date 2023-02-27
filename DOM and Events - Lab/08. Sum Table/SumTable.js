function sumTable() {
    const table = document.querySelectorAll('td')
    let sum = document.getElementById('sum')

    let total_sum = 0

    for (let i = 0; i < table.length - 1; i++) {
        if (i % 2 !== 0) {
            total_sum += parseFloat(table[i].innerText)
        }
    }
    sum.innerText = total_sum.toFixed(2)

}

