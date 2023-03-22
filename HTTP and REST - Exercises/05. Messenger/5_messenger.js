function attachEvents() {
    const name = document.querySelector('input[name=\'author\']')
    const content = document.querySelector('input[name=\'content\']')
    const messages = document.querySelector('#messages')
    const [submit, refresh] = Array.from(document.querySelectorAll('#controls > input'))
    const apiUrl = 'http://localhost:3030/jsonstore/messenger'

    submit.addEventListener('click', () => {

        const message = {
            author: name.value,
            content: content.value
        }

        fetch(apiUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(message),
        })
    })

    refresh.addEventListener('click', () => {
        messages.textContent = ''
        let output = []
        fetch(apiUrl).then(x => x.json()).then(x => {
            for (const key in x) {
                output.push(`${x[key].author}: ${x[key].content}`)
            }
            messages.textContent = output.join('\n')
        }).catch()
    })
}

attachEvents();

