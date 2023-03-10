function validate() {
    const email = document.querySelector('#email')

    function validateEmail() {
        const output = email.value.match(/^[a-z]+@[a-z]+\.[a-z]+$/)
        if (!output) {
            email.classList.add('error')
        } else {
            email.classList.remove('error')
        }
    }
    email.addEventListener('change', validateEmail)
}
