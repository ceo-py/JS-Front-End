function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/phonebook';

    const ulPhonebook = document.getElementById('phonebook');
    const btnLoad = document.getElementById('btnLoad');
    const btnCreate = document.getElementById('btnCreate');
    const inputPerson = document.getElementById('person');
    const inputPhone = document.getElementById('phone');

    btnLoad.addEventListener('click', loadPhonebook);
    btnCreate.addEventListener('click', createPhonebookEntry);

    function loadPhonebook() {
        ulPhonebook.innerHTML = ''

        fetch(baseUrl)
            .then(response => response.json())
            .then(data => {
                Object.values(data).forEach(entry => {
                    const li = document.createElement('li')
                    li.textContent = `${entry.person}: ${entry.phone}`
                    const btnDelete = document.createElement('button')
                    btnDelete.textContent = 'Delete'
                    btnDelete.addEventListener('click', () => deletePhonebookEntry(entry._id, li))
                    li.appendChild(btnDelete)
                    ulPhonebook.appendChild(li)
                })
            })
            .catch()
    }

    function createPhonebookEntry() {
        const person = inputPerson.value.trim()
        const phone = inputPhone.value.trim()

        if (!person || !phone) {
            return
        }

        const data = {person, phone};

        fetch(baseUrl, {
            method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)
        })
            .then(() => {
                inputPerson.value = ''
                inputPhone.value = ''
                loadPhonebook()
            })
            .catch()
    }

    function deletePhonebookEntry(key, li) {
        fetch(`${baseUrl}/${key}`, {
            method: 'DELETE'
        })
            .then(() => li.remove())
            .catch()
    }

}


attachEvents();

