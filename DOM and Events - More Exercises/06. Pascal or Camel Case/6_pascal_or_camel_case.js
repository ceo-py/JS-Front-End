function solve() {
    const textToConvert = document.querySelector('#text').value.split(' ');
    const namingConvention = document.querySelector('#naming-convention').value
    const result = document.querySelector('#result')
    let output = []


    if (namingConvention === 'Camel Case') {

        textToConvert.forEach((x, index) => {
            x = x.toLowerCase()
            if (index !== 0) {
                output.push(x.charAt(0).toUpperCase() + x.slice(1))
            } else {
                output.push(x.toLowerCase())
            }
        })

    } else if (namingConvention === 'Pascal Case') {

        textToConvert.forEach(x => {
            x = x.toLowerCase()
            output.push(x.charAt(0).toUpperCase() + x.slice(1))
        })

    } else {
        output.push('Error!')
    }
    result.textContent = output.join('')
}
