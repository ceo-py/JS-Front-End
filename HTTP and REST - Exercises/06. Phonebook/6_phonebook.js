function attachEvents() {
    const phonebookAPI = 'http://localhost:3030/jsonstore/phonebook/'
    const person = document.querySelector('#person')
    const phone = document.querySelector('#phone')
    const phonebook = document.querySelector('#phonebook')

    const btnLoad = async () => {
        const response = await fetch(phonebookAPI)
        const phonebookData = await response.json()
        phonebook.innerHTML = ''
        for (const key in phonebookData) {
            const currentElement = phonebookData[key]
            phonebook.innerHTML += `<li>${currentElement.person}: ${currentElement.phone}<button id="${currentElement._id}" onclick="funcJs.btnDelete(this)">Delete</button></li>`
        }
        person.value = ''
        phone.value = ''


    }
    const btnCreate = async () => {
        await fetch(phonebookAPI, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                person: person.value,
                phone: phone.value,
            })

        })
        await btnLoad()
    }

    const btnDelete = async (e) => {
        await fetch(`${phonebookAPI}${e.id}`, {
            method: 'DELETE'
        })
        await btnLoad()
    }

    return {
        btnLoad,
        btnCreate,
        btnDelete
    }
}

const funcJs = attachEvents();












// function attachEvents() {
//     const baseUrl = 'http://localhost:3030/jsonstore/phonebook';
//
//     const ulPhonebook = document.getElementById('phonebook');
//     const btnLoad = document.getElementById('btnLoad');
//     const btnCreate = document.getElementById('btnCreate');
//     const inputPerson = document.getElementById('person');
//     const inputPhone = document.getElementById('phone');
//
//     btnLoad.addEventListener('click', loadPhonebook);
//     btnCreate.addEventListener('click', createPhonebookEntry);
//
//     function loadPhonebook() {
//         ulPhonebook.innerHTML = ''
//
//         fetch(baseUrl)
//             .then(response => response.json())
//             .then(data => {
//                 Object.values(data).forEach(entry => {
//                     const li = document.createElement('li')
//                     li.textContent = `${entry.person}: ${entry.phone}`
//                     const btnDelete = document.createElement('button')
//                     btnDelete.textContent = 'Delete'
//                     btnDelete.addEventListener('click', () => deletePhonebookEntry(entry._id, li))
//                     li.appendChild(btnDelete)
//                     ulPhonebook.appendChild(li)
//                 })
//             })
//             .catch()
//     }
//
//     function createPhonebookEntry() {
//         const person = inputPerson.value.trim()
//         const phone = inputPhone.value.trim()
//
//         if (!person || !phone) {
//             return
//         }
//
//         const data = {person, phone};
//
//         fetch(baseUrl, {
//             method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)
//         })
//             .then(() => {
//                 inputPerson.value = ''
//                 inputPhone.value = ''
//                 loadPhonebook()
//             })
//             .catch()
//     }
//
//     function deletePhonebookEntry(key, li) {
//         fetch(`${baseUrl}/${key}`, {
//             method: 'DELETE'
//         })
//             .then(() => li.remove())
//             .catch()
//     }
//
// }
//
//
// attachEvents();

