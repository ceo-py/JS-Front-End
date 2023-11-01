window.addEventListener("load", solve);

function solve() {
    const scholarshipInput = {
        'nameStudent' : document.querySelector('#student'),
        'university' : document.querySelector('#university'),
        'score' : document.querySelector('#score'),
    }
    const scholarship = {
        'nextBtn': document.querySelector('#next-btn'),
        'previewList': document.querySelector('#preview-list'),
        'candidatesList': document.querySelector('#candidates-list'),
        'inputData': []
    }

    
    const clearInput = (input) => input.forEach(x => x.value = '') 
    const checkCorrectInput = (input) => input.every(x => x.value.length !== 0)
    
    const editFunc = (e) => {
        const currentApplication = e.target.parentNode
        Object.values(scholarshipInput).forEach((x, i) => x.value = scholarship.inputData[i])
        currentApplication.remove()
        scholarship.nextBtn.disabled = false
        scholarship.inputData = []
    }
    
    const applyFunc = (e) => {
        const currentApplication = e.target.parentNode;
        [...currentApplication.querySelectorAll('button')].forEach(b => b.remove())
        scholarship.previewList.removeChild(currentApplication)
        scholarship.candidatesList.appendChild(currentApplication)
        scholarship.nextBtn.disabled = false
        scholarship.inputData = []
    }
    
    const nextBtnFunc = () => {
        if (!checkCorrectInput(Object.values(scholarshipInput))) return
        Object.values(scholarshipInput).forEach(x => scholarship.inputData.push(x.value))
        scholarship.previewList.innerHTML += `
            <li class="application">
                <article>
                    <h4>${scholarshipInput.nameStudent.value}</h4>
                    <p>University: ${scholarshipInput.university.value}</p>
                    <p>Score: ${scholarshipInput.score.value}</p>
                </article>
                <button class="action-btn edit">edit</button>
                <button class="action-btn apply">apply</button>
            </li>`;
        [...scholarship.previewList.querySelectorAll('button')].forEach((x, i) => x.addEventListener('click', i % 2 === 0?editFunc: applyFunc))
        clearInput(Object.values(scholarshipInput))
        scholarship.nextBtn.disabled = true
    }
    scholarship.nextBtn.addEventListener('click', nextBtnFunc)
}