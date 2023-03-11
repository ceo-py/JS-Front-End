function generateReport() {
    const selectedColumns = Array.from(document.querySelectorAll('thead > tr > th > input'))
    const tableContent = Array.from(document.querySelectorAll('tbody > tr'))
    const output = document.querySelector('#output')
    let fieldsToDisplay = {}
    let resultOutput = [...Array(tableContent.length)].map(() => ({}))
    output.value = ''


    function addFields() {
        for (let key in fieldsToDisplay) {
            tableContent.forEach((y, index) => {
                let text = y.querySelectorAll('td')[fieldsToDisplay[key]].textContent
                Object.assign(resultOutput[index], {[key]: text})
            })
        }
    }


    selectedColumns.forEach((x, index) => {
        let [columName, selected] = [x.name, x.checked]

        if (selected) {
            fieldsToDisplay[columName] = index
        }
    })
    addFields()
    output.value = JSON.stringify(resultOutput)
}
