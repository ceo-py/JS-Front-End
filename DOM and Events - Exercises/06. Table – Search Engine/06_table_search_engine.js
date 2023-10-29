function solve() {

    document.querySelector('#searchBtn').addEventListener('click', onClick)

    function onClick() {
        const table =[...document.querySelectorAll('tbody > tr')]
        const searchField = document.querySelector('#searchField')

        table.forEach(item => {
            item.classList.remove('select')
            if (item.innerText.includes(searchField.value)&& searchField.value.length > 0) {
                item.className = 'select'
            }
        })
        searchField.value = ''
    }
}
