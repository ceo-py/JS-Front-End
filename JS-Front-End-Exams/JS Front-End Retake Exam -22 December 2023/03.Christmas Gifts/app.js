function solve() {
    const API_URL = 'http://localhost:3030/jsonstore/gifts/'
    const christmasGifts = {
        inputFields: [...document.querySelectorAll('input')],
        addPresentBtn: document.querySelector('#add-present'),
        editPresentBtn: document.querySelector('#edit-present'),
        loadPresentBtn: document.querySelector('#load-presents'),
        giftList: document.querySelector('#gift-list'),
        form: document.querySelector('form'),
        itemId: null
    }

    const changeBtnAction = () => [christmasGifts.addPresentBtn.disabled = !christmasGifts.addPresentBtn.disabled, christmasGifts.editPresentBtn.disabled = !christmasGifts.editPresentBtn.disabled]

    const body = (id) => {
        const bodyRaw = {}
        christmasGifts.inputFields.forEach(x => bodyRaw[x.name] = x.value)
        if (id) bodyRaw._id = id
        return JSON.stringify(bodyRaw)
    }


    const addPresentBtnHandler = () => {
        fetch(`${API_URL}`, {
            method: 'POST', body: body()
        }).then(() => {
            christmasGifts.form.reset()
            loadPresentBtnHandler()
        })

    }

    const editPresentBtnHandler = () => {
        const ItemId = christmasGifts.itemId
        fetch(`${API_URL}${ItemId}`, {
            method: 'PUT', body: body(ItemId)
        }).then(() => loadPresentBtnHandler())
        changeBtnAction()
        christmasGifts.form.reset()
    }

    const changePresentBtnHandler = (e) => {
        const currentItem = e.parentNode.parentNode
        christmasGifts.itemId = e.id;
        [...currentItem.querySelectorAll('p')].forEach((x, i) => christmasGifts.inputFields[i].value = x.textContent)
        christmasGifts.giftList.removeChild(currentItem)
        changeBtnAction()
    }

    const deletePresentBtnHandler = (e) => fetch(`${API_URL}${e.id}`, {method: 'DELETE'}).then(() => loadPresentBtnHandler())

    const loadPresentBtnHandler = () => {
        christmasGifts.giftList.innerHTML = ''
        fetch(API_URL).then(x => x.json()).then(o => {
            Object.values(o).forEach(x => {
                christmasGifts.giftList.innerHTML += `
                <div class="gift-sock">
                  <div class="content">
                    ${Object.values(x).slice(0, -1).map(n => `<p>${n}</p>`).join('')}
                  </div>
                  <div class="buttons-container">
                    <button class="change-btn" id="${x._id}" onclick="funcJs.changePresentBtnHandler(this)">Change</button>
                    <button class="delete-btn" id="${x._id}" onclick="funcJs.deletePresentBtnHandler(this)">Delete</button>
                  </div>
                </div>
                `
            })
        })
    }
    christmasGifts.addPresentBtn.addEventListener('click', addPresentBtnHandler)
    christmasGifts.editPresentBtn.addEventListener('click', editPresentBtnHandler)
    christmasGifts.loadPresentBtn.addEventListener('click', loadPresentBtnHandler)

    return {
        changePresentBtnHandler, deletePresentBtnHandler,
    }
}

const funcJs = solve()