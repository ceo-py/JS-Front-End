function attachEvents() {
    console.log('a')
    const loadButton = document.querySelector('#load-button')
    const addButton = document.querySelector('#add-button')
    const output = document.querySelector('.todo-list')

    const tasks = fetch('http://localhost:3030/jsonstore/tasks').then(x => x.json()).then((list))
    // const tasks = response.then.json();
    // const taskList = document.getElementById('task-list');

    for (const task of Object.values(tasks)) {
        console.log(task)
        const li = document.createElement('li');
        const span = document.createElement('span');
        const removeBtn = document.createElement('button');
        const editBtn = document.createElement('button');

        span.textContent = task.name;
        removeBtn.textContent = 'Remove';
        editBtn.textContent = 'Edit';

        removeBtn.addEventListener('click', () => {
            // TODO: Implement remove task functionality
        });

        editBtn.addEventListener('click', () => {
            // TODO: Implement edit task functionality
        });

        li.appendChild(span);
        li.appendChild(removeBtn);
        li.appendChild(editBtn);
        output.appendChild(li);
    }
}

attachEvents();
