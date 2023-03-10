function search() {
    const towns = Array.from(document.querySelectorAll('li'))
    const result = document.querySelector('#result')
    const searchingText = document.querySelector('#searchText').value
    let matchedSearch = 0

    towns.forEach(x => {
        if (x.textContent.includes(searchingText)) {
            matchedSearch += 1
            x.style.fontWeight = 'bold'
            x.style.textDecoration = 'underline'
        }
    })
    result.textContent = `${matchedSearch} matches found`
}
