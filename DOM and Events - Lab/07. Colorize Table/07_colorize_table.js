function colorize() {
    const table = document.querySelector('table').rows
    for (i = 0; i < table.length; i++) {
        if (i % 2 !== 0) {
            table[i].style.backgroundColor = 'Teal'
        }
    }
}
    