window.addEventListener("load", solve);

function solve() {
    const expenseTracker = {
        inputFields: {
            type: document.querySelector('#expense'),
            amount: document.querySelector('#amount'),
            date: document.querySelector('#date'),
        },
        addBtn: document.querySelector('#add-btn'),
        previewList: document.querySelector('#preview-list'),
        expensesList: document.querySelector('#expenses-list'),
        deleteBtn: document.querySelector('.delete'),
        addedExpense: null
    }

    const clearInputFields = (input) => input.forEach(x => x.value = '')
    const isInputCorrect = (input) => input.some(x => x.value === '')

    const handleDeleteBtn = () => location.reload()

    const handleEdit = () => {
        expenseTracker.previewList.innerHTML = ''
        Object.values(expenseTracker.inputFields).forEach((x, i) => x.value = expenseTracker.addedExpense[i])
        expenseTracker.addBtn.disabled = false
    }

    const handleOk = (e) => {
        const currentElement = e.target.parentNode.parentNode
        expenseTracker.previewList.innerHTML = '';
        currentElement.querySelector('.buttons').remove()
        expenseTracker.expensesList.appendChild(currentElement)
        expenseTracker.addBtn.disabled = false
    }

    const handleAddBtn = (e) => {
        e.preventDefault()
        const inputFields = Object.values(expenseTracker.inputFields)
        if (isInputCorrect(inputFields)) return
        expenseTracker.previewList.innerHTML = `
            <li class="expense-item">
                <article>
                    <p>Type: ${expenseTracker.inputFields.type.value}</p>
                    <p>Amount: ${expenseTracker.inputFields.amount.value}$</p>
                    <p>Date: ${expenseTracker.inputFields.date.value}</p>
                </article>
                <div class="buttons">
                    <button class="btn edit">edit</button>
                    <button class="btn ok">ok</button>
                </div>
            </li>`;
        [...expenseTracker.previewList.querySelectorAll('button')].forEach((x, i) => x.addEventListener('click', i % 2 === 0 ? handleEdit : handleOk))
        expenseTracker.addBtn.disabled = true
        expenseTracker.addedExpense = inputFields.map(x => x.value)
        clearInputFields(inputFields)
    }

    expenseTracker.addBtn.addEventListener('click', handleAddBtn)
    expenseTracker.deleteBtn.addEventListener('click', handleDeleteBtn)
}

