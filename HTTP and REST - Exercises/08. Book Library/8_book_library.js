function attachEvents() {
    const loadAllBooksBtn = document.getElementById('loadBooks');
    const BASE_URL = 'http://localhost:3030/jsonstore/collections/books/';

    const titleInput = document.querySelector('input[name="title"]');
    const authorInput = document.querySelector('input[name="author"]');
    const formHeader = document.querySelector('#form h3');

    const tableBody = document.getElementsByTagName('tbody')[0];
    const submitBtn = document.querySelector('#form button');

    loadAllBooksBtn.addEventListener('click', loadAllBooks);
    submitBtn.addEventListener('click', submitHandler);

    let booksData = {};
    let editBookId = null;

    async function loadAllBooks() {
        tableBody.innerHTML = '';
        const allBooksResponse = await fetch(BASE_URL);
        const allBooksData = await allBooksResponse.json();
        booksData = allBooksData;

        for (const bookId in allBooksData) {
            const { author, title } = allBooksData[bookId];

            // Creating the new HTML elements
            let tr = document.createElement('tr');
            let tdTitle = document.createElement('td');
            let tdAuthor = document.createElement('td');
            let tdButtons = document.createElement('td');
            let editBtn = document.createElement('button');
            let deleteBtn = document.createElement('button');

            // Setting element attributes

            tdTitle.textContent = title;
            tdAuthor.textContent = author;
            editBtn.textContent = 'Edit';
            deleteBtn.textContent = 'Delete';
            editBtn.id = bookId;
            deleteBtn.id = bookId;

            // Adding click events
            editBtn.addEventListener('click', loadEditForm);
            deleteBtn.addEventListener('click', deleteBook);

            // DOM Manipulations
            tr.appendChild(tdTitle);
            tr.appendChild(tdAuthor);
            tdButtons.appendChild(editBtn);
            tdButtons.appendChild(deleteBtn);
            tr.appendChild(tdButtons);
            tableBody.appendChild(tr);

        }
    }

    function loadEditForm() {
        editBookId = this.id;
        formHeader.textContent = 'Edit FORM';
        submitBtn.textContent = 'Save';
        const bookById = booksData[this.id];
        titleInput.value = bookById.title;
        authorInput.value = bookById.author;
    }

    async function submitHandler() {
        let title = titleInput.value;
        let author = authorInput.value;

        if (author === '' || title === '') {
            alert('Please fill in all the required fields');
            return;
        }

        const httpHeaders = {
            method: 'POST',
            body: JSON.stringify({ title, author }),
        }
        let url = BASE_URL;

        if (formHeader.textContent === 'Edit FORM') {
            httpHeaders.method = 'PUT';
            url += editBookId;
        }

        const resData = await fetch(url, httpHeaders);
        loadAllBooks();

        if (formHeader.textContent === 'Edit FORM') {
            formHeader.textContent = 'FORM';
            submitBtn.textContent = 'Submit';
        }
        titleInput.value = '';
        authorInput.value = '';
    }

    async function deleteBook() {
        const id = this.id;
        const httpHeaders = {
            method: 'DELETE'
        }

        await fetch(BASE_URL + id, httpHeaders);
        loadAllBooks();
    }

}

attachEvents();