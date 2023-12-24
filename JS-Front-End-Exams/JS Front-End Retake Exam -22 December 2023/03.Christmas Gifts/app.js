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

    const body = (id) => {
        const bodyRaw = {
            gift: christmasGifts.inputFields[0].value,
            for: christmasGifts.inputFields[1].value,
            price: christmasGifts.inputFields[2].value,
        }
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
        christmasGifts.addPresentBtn.disabled = false
        christmasGifts.editPresentBtn.disabled = true
        christmasGifts.form.reset()
    }

    const changePresentBtnHandler = (e) => {
        const currentItem = e.parentNode.parentNode
        christmasGifts.itemId = e.id;
        [...currentItem.querySelectorAll('p')].forEach((x, i) => christmasGifts.inputFields[i].value = x.textContent)
        christmasGifts.giftList.removeChild(currentItem)
        christmasGifts.addPresentBtn.disabled = true
        christmasGifts.editPresentBtn.disabled = false
    }

    const deletePresentBtnHandler = (e) => {
        fetch(`${API_URL}${e.id}`, {
            method: 'DELETE'
        }).then(() => loadPresentBtnHandler())
    }

    const loadPresentBtnHandler = () => {
        christmasGifts.giftList.innerHTML = ''
        fetch(API_URL).then(x => x.json()).then(o => {
            Object.values(o).forEach(x => {
                christmasGifts.giftList.innerHTML += `
                <div class="gift-sock">
                  <div class="content">
                    <p>${x.gift}</p>
                    <p>${x.for}</p>
                    <p>${x.price}</p>
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