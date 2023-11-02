window.addEventListener("load", solve);

function solve() {
    const dartScoring = {
        inputFields: {
            player: document.querySelector('#player'),
            score: document.querySelector('#score'),
            round: document.querySelector('#round'),
        },
        addBtn: document.querySelector('#add-btn'),
        sureList: document.querySelector('#sure-list'),
        scoreboardList: document.querySelector('#scoreboard-list'),
        clearBtn: document.querySelector('.clear'),
        inputData: [],
    }

    const correctInput = (input) => input.every(x => x.value.length !== 0)
    const clearInputFields = (input) => input.forEach(x => x.value = '')

    const editBtnFunc = (e) => {
        dartScoring.sureList.removeChild(e.target.parentNode)
        Object.values(dartScoring.inputFields).forEach((x, i) => x.value = dartScoring.inputData[i])
        dartScoring.addBtn.disabled = false
    }

    const okBtnFunc = (e) => {
        const currentContainer = e.target.parentNode
        dartScoring.sureList.removeChild(currentContainer);
        [...currentContainer.querySelectorAll('button')].forEach(x => x.remove())
        dartScoring.scoreboardList.appendChild(currentContainer)
        dartScoring.addBtn.disabled = false

    }

    const addBtnFunc = (e) => {
        e.preventDefault()
        if (!correctInput(Object.values(dartScoring.inputFields))) return
        dartScoring.inputData = Object.values(dartScoring.inputFields).map(x => x.value)
        dartScoring.sureList.innerHTML = `
            <li class="dart-item">
                <article>
                    <p>${dartScoring.inputFields.player.value}</p>
                    <p>Score: ${dartScoring.inputFields.score.value}</p>
                    <p>Round: ${dartScoring.inputFields.round.value}</p>
                </article>
                <button class="btn edit">edit</button>
                <button class="btn ok">ok</button>
            </li>`;
        [...dartScoring.sureList.querySelectorAll('button')].forEach((x, i) => x.addEventListener('click', i % 2 === 0 ? editBtnFunc : okBtnFunc))
        dartScoring.addBtn.disabled = true
        clearInputFields(Object.values(dartScoring.inputFields))
    }

    const clearBtnFunc = (e) => {
        e.preventDefault()
        dartScoring.scoreboardList.innerHTML = ''
    }

    dartScoring.addBtn.addEventListener('click', addBtnFunc)
    dartScoring.clearBtn.addEventListener('click', clearBtnFunc)
}






// function solve() {
//     const dartScoring = {
//         inputFields: {
//             player: document.querySelector('#player'),
//             score: document.querySelector('#score'),
//             round: document.querySelector('#round'),
//         },
//         addBtn: document.querySelector('#add-btn'),
//         sureList: document.querySelector('#sure-list'),
//         scoreboardList: document.querySelector('#scoreboard-list'),
//         clearBtn: document.querySelector('.clear'),
//         inputData: []
//     }
//
//     const resetInputFields = (input) => input.forEach(x => x.value = '')
//     const correctInputs = (input) => input.every(x => x.value.length !== 0)
//
//     const editBtnFunc = () => {
//         dartScoring.addBtn.disabled = false
//         dartScoring.sureList.innerHTML = ''
//         Object.values(dartScoring.inputFields).forEach((x, i)=> x.value = dartScoring.inputData[i])
//     }
//
//     const okBtnFunc = (e) => {
//         const currentContainer = e.target.parentNode;
//         [...currentContainer.querySelectorAll('button')].forEach(x => x.remove())
//         dartScoring.sureList.removeChild(currentContainer)
//         dartScoring.scoreboardList.appendChild(currentContainer)
//         dartScoring.addBtn.disabled = false
//     }
//
//     const addBtnFunc = (e) => {
//         e.preventDefault()
//         if (!correctInputs(Object.values(dartScoring.inputFields))) return
//         dartScoring.addBtn.disabled = true
//         dartScoring.inputData = [...Object.values(dartScoring.inputFields).map(x => x.value)]
//         dartScoring.sureList.innerHTML = `
//             <li class="dart-item">
//                 <article>
//                     <p>${dartScoring.inputFields.player.value}</p>
//                     <p>Score: ${dartScoring.inputFields.score.value}</p>
//                     <p>Round: ${dartScoring.inputFields.round.value}</p>
//                 </article>
//                 <button class="btn edit">edit</button>
//                 <button class="btn ok">ok</button>
//             </li>`;
//         [...dartScoring.sureList.querySelectorAll('button')].forEach((x, i) => x.addEventListener('click', i % 2 ===0 ? editBtnFunc: okBtnFunc))
//         resetInputFields(Object.values(dartScoring.inputFields))
//     }
//
//     const clearBtnFunc = () => {
//         location.reload()
//         // dartScoring.scoreboardList.innerHTML = ''
//         // dartScoring.sureList.innerHTML = ''
//         // dartScoring.addBtn.disabled = false
//     }
//
//     dartScoring.addBtn.addEventListener('click', addBtnFunc)
//     dartScoring.clearBtn.addEventListener('click', clearBtnFunc)
// }