function encodeAndDecodeMessages() {
    const [encodeBtn, decodeBtn] = Array.from(document.querySelectorAll('button'))
    let [sendText, receivedText] = Array.from(document.querySelectorAll('textarea'))

    encodeBtn.addEventListener('click', x => {
        let output = ''
        for (const letter of sendText.value) {
            output += String.fromCharCode(letter.charCodeAt(0) + 1)
        }
        sendText.value = ''
        receivedText.value = output
    })
    
    decodeBtn.addEventListener('click', x => {
        let output = ''
        for (const letter of receivedText.value) {
            output += String.fromCharCode(letter.charCodeAt(0) - 1)
        }
        receivedText.value = output
    })
}
