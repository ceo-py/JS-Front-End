function lockedProfile() {
    const profileAPI = 'http://localhost:3030/jsonstore/advanced/profiles'
    const main = document.querySelector('#main')
    main.innerHTML = ''

    const toggleHiddenFields = (btnText, style, e) => {
        const hiddenFields = e.parentElement.querySelector('#user1HiddenFields')
        hiddenFields.style.display = style
        e.textContent = btnText
    }

    const btnShow = (e) => {
        const parentElement = e.parentElement
        const unlock = parentElement.querySelector('input[value="unlock"]')


        if (unlock.checked && e.textContent === 'Show more') {
            toggleHiddenFields('Hide it', 'inline-block', e)
        } else if (unlock.checked) {
            toggleHiddenFields('Show more', 'none', e)
        }
    }

    fetch(profileAPI).then(x => x.json())
        .then(o => {
            Object.values(o).forEach(x => {
                main.innerHTML += `
            <div class="profile">
                <img src="./iconProfile2.png" class="userIcon" alt="prifile pic"/>
                <label>Lock</label>
                <input type="radio" name="user1Locked" value="lock" checked>
                <label>Unlock</label>
                <input type="radio" name="user1Locked" value="unlock"><br>
                <hr>
                <label>Username</label>
                <input type="text" name="user1Username" value="${x.username}" disabled readonly />
                <div id="user1HiddenFields" style="display: none">
                    <hr>
                    <label>Email:</label>
                    <input type="email" name="user1Email" value="${x.email}" disabled readonly />
                    <label>Age:</label>
                    <input type="email" name="user1Age" value="${x.age}" disabled readonly />
                </div>
            <button onclick="funcJS.btnShow(this)">Show more</button>
            </div>`
            })
        })

    return {
        btnShow
    }
}

const funcJS = lockedProfile()












// async function lockedProfile() {
//     const API_URL = 'http://localhost:3030/jsonstore/advanced/profiles'
//     const profile = document.querySelector('.profile')
//     const main = document.querySelector('#main')
//
//     const loadDataFromApi = async () => {
//         const data = await fetch(API_URL)
//         return await data.json()
//     }
//
//     const showMoreBtnFunctionality = () => {
//         const e = event.target.parentElement
//
//         const [lockCheck, unlockCheck] = e.querySelectorAll('input[type="radio"]')
//         const showIndo = e.querySelector('.user1Username')
//
//         if (unlockCheck.checked) {
//
//             showIndo.style.display = 'inline-block'
//             event.target.textContent = 'Hide it'
//         } else  {
//             showIndo.style.display = 'none'
//             event.target.textContent = 'Show more'
//         }
//     }
//
//     const createHtmlElement2 = (data) => {
//         const copyElement = profile.cloneNode(true)
//         const [name, email, age] = Array.from(copyElement.querySelectorAll('input')).slice(2)
//         const showIndo = copyElement.querySelector('.user1Username')
//
//
//         name.value = data.username
//         email.value = data.email
//         age.value = data.age
//         showIndo.style.display = 'none'
//
//         const showMoreBtn = copyElement.querySelector('button')
//         showMoreBtn.addEventListener('click', showMoreBtnFunctionality)
//
//
//         return copyElement
//     }
//
//     const loadDataToHTML = async (data) => {
//         main.innerHTML = ''
//
//         for (const key in data) {
//             main.appendChild(await createHtmlElement2(data[key]))
//         }
//     }
//     await loadDataToHTML(await loadDataFromApi())
// }
