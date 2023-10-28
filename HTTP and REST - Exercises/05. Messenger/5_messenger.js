function attachEvents() {
    const messagesAPI = 'http://localhost:3030/jsonstore/messenger'
    const author = document.querySelector('input[name="author"]')
    const content = document.querySelector('input[name="content"]')
    const messages = document.querySelector('#messages')


    const submit = async () => {
        await fetch(messagesAPI, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                author: author.value,
                content: content.value,
            })
        })
        author.value = ''
        content.value = ''
        await refresh()
    }

    const refresh = async () => {
        const response = await fetch(messagesAPI)
        const dataMessages = await response.json()
        const output = []
        Object.keys(dataMessages).forEach(x => {
            const currentElement = dataMessages[x]
            output.push(`${currentElement.author}: ${currentElement.content}`)
        })
        messages.textContent = output.join('\n')
    }

    return {
        submit,
        refresh
    }
}

const funcJS = attachEvents();







// function attachEvents() {
//     const name = document.querySelector('input[name=\'author\']')
//     const content = document.querySelector('input[name=\'content\']')
//     const messages = document.querySelector('#messages')
//     const [submit, refresh] = Array.from(document.querySelectorAll('#controls > input'))
//     const apiUrl = 'http://localhost:3030/jsonstore/messenger'
//
//     submit.addEventListener('click', () => {
//
//         const message = {
//             author: name.value,
//             content: content.value
//         }
//
//         fetch(apiUrl, {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(message),
//         })
//     })
//
//     refresh.addEventListener('click', () => {
//         messages.textContent = ''
//         let output = []
//         fetch(apiUrl).then(x => x.json()).then(x => {
//             for (const key in x) {
//                 output.push(`${x[key].author}: ${x[key].content}`)
//             }
//             messages.textContent = output.join('\n')
//         }).catch()
//     })
// }
//
// attachEvents();

