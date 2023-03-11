function solve() {
    const [checkBtn, reset] = Array.from(document.querySelectorAll('button'))
    const tableRows = Array.from(document.querySelectorAll('tbody > tr'))
    let tableBorder = document.querySelector('table')
    let output = document.querySelector('#check > p')
    let matrix = []

    checkBtn.addEventListener('click', checkResult)
    reset.addEventListener('click', resetResult)
    let correctFill = true


    function checkColumns() {
        for (let i = 0; i < matrix.length; i++) {
            let row = matrix[i]
            let col = matrix.map(row => row[i])
            if (col.length !== new Set(col).size || row.length !== new Set(row).size) {
                correctFill = false
                break
            }
        }
    }

    function checkResult() {
        for (let items of tableRows) {
            let row = Array.from(items.querySelectorAll('td > input'))
            let rowData = []

            for (item of row) {
                let number = Number(item.value)
                rowData.push(number)
            }
            matrix.push(rowData)
        }
        
        checkColumns()
        if (correctFill) {
            tableBorder.style.border = '2px solid green'
            output.textContent = 'You solve it! Congratulations!'
            output.style.color = 'green'
        } else {
            tableBorder.style.border = '2px solid red'
            output.textContent = 'NOP! You are not done yet...'
            output.style.color = 'red'
        }
    }

    function resetResult() {
        tableRows.forEach(x => {
            Array.from(x.querySelectorAll('td > input')).forEach(y => {
                y.value = ''
            })
        })

        tableBorder.style.border = ''
        output.textContent = ''
        output.style.color = ''
    }

}


