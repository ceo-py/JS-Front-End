function attachEventsListeners() {
    const [inputUnits, inputDistance] = [document.querySelector('#inputUnits'), document.querySelector('#inputDistance')]
    const [outputUnits, outputDistance] = [document.querySelector('#outputUnits'), document.querySelector('#outputDistance')]
    const convertBtn = document.querySelector('#convert')
    
    convertBtn.addEventListener('click', x => {
        const units = {
            km: 1000,
            m: 1,
            cm: 0.01,
            mm: 0.001,
            mi: 1609.34,
            yrd: 0.9144,
            ft: 0.3048,
            in: 0.0254
        }

        const fromValue = Number(inputDistance.value) * units[inputUnits.value]
        outputDistance.disabled = false
        outputDistance.value = fromValue / units[outputUnits.value]
    })
}
