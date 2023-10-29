function attachGradientEvents() {
    const gradient = document.querySelector('#gradient')
    const result = document.querySelector('#result')
    gradient.addEventListener('mousemove', (e) => result.textContent = `${parseInt((e.offsetX / gradient.clientWidth) * 100)}%`)
    gradient.addEventListener('mouseout', () => result.textContent = '')
}






// function attachGradientEvents() {
//     const gradient = document.querySelector('#gradient')
//     const result = document.querySelector('#result')
//     gradient.addEventListener('mouseout', hidePercent)
//     gradient.addEventListener('mousemove', showPercent)
//
//
//     function showPercent(event) {
//         const x = event.offsetX
//         const width = gradient.clientWidth
//         const percentage = parseInt((x / width) * 100)
//         result.textContent = `${percentage}%`
//     }
//
//     function hidePercent() {
//         result.textContent = ''
//     }
// }
