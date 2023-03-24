async function lockedProfile() {
    const API_URL = 'http://localhost:3030/jsonstore/advanced/profiles'
    const profile = document.querySelector('.profile')
    const main = document.querySelector('#main')

    const loadDataFromApi = async () => {
        const data = await fetch(API_URL)
        return await data.json()
    }

    const showMoreBtnFunctionality = () => {
        const e = event.target.parentElement

        const [lockCheck, unlockCheck] = e.querySelectorAll('input[type="radio"]')
        const showIndo = e.querySelector('.user1Username')

        if (unlockCheck.checked) {

            showIndo.style.display = 'inline-block'
            event.target.textContent = 'Hide it'
        } else  {
            showIndo.style.display = 'none'
            event.target.textContent = 'Show more'
        }
    }

    const createHtmlElement2 = (data) => {
        const copyElement = profile.cloneNode(true)
        const [name, email, age] = Array.from(copyElement.querySelectorAll('input')).slice(2)
        const showIndo = copyElement.querySelector('.user1Username')


        name.value = data.username
        email.value = data.email
        age.value = data.age
        showIndo.style.display = 'none'

        const showMoreBtn = copyElement.querySelector('button')
        showMoreBtn.addEventListener('click', showMoreBtnFunctionality)


        return copyElement
    }

    const loadDataToHTML = async (data) => {
        main.innerHTML = ''

        for (const key in data) {
            main.appendChild(await createHtmlElement2(data[key]))
        }
    }
    await loadDataToHTML(await loadDataFromApi())
}
