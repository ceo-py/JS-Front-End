function focused() {
    const inputs = document.querySelectorAll("input[type='text']");
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        input.addEventListener('focus', (event) => {
            const div = event.target.parentNode;
            div.classList.add('focused');
        });
        input.addEventListener('blur', (event) => {
            const div = event.target.parentNode;
            div.classList.remove('focused');
        });
    }
}
