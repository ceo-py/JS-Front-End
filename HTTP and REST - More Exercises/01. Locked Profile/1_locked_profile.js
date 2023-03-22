async function lockedProfile() {
    const main = document.querySelector('#main')
    const profile = document.querySelector('.profile')
    const profileApiUrl = 'http://localhost:3030/jsonstore/advanced/profiles'
    
    const getProfilesFromDB  = async () => {
        const data = await fetch(profileApiUrl)
        return data.json()
    }
    
    const showResult = async ()=> {
        const [_, unlockBtn] = event.target.parentElement.querySelectorAll('input[type="radio"]')
        if (unlockBtn.checked) {
            const showInfo = unlockBtn.parentElement.querySelector('.user1Username')
            const btn = event.target
            if (showInfo.style.display === 'inline-block') {
                showInfo.style.display = 'none'
                btn.textContent = 'Show more'
            } else {
                showInfo.style.display = 'inline-block'
                btn.textContent = 'Hide It'
            }
        }
    }
    
    const loadProfilesToHtml = async (profiles) => {
        main.innerHTML = ''
        for (const key in profiles) {
            const cloneProfile = profile.cloneNode(true)
            cloneProfile.setAttribute('id', key)
            const showBtn = cloneProfile.querySelector('button')
            const email = cloneProfile.querySelector('input[type="email"]')
            const [userName, userAge] = cloneProfile.querySelectorAll('input[type="text"]')
            const showResultData = cloneProfile.querySelector('.user1Username')
            
            showResultData.style.display = 'none'
            
            userName.value = profiles[key].username
            email.value = profiles[key].email
            userAge.value = profiles[key].age
            
            showBtn.addEventListener('click', await showResult)
            
            
            main.appendChild(cloneProfile)
        }
    }
    
    await loadProfilesToHtml(await getProfilesFromDB())
    
    
    
    
}