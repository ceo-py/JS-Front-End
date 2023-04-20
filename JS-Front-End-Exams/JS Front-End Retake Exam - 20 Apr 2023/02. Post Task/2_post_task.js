window.addEventListener("load", solve);

function solve() {
    const inputFields = {
        title: document.querySelector('#task-title'),
        category: document.querySelector('#task-category'),
        content: document.querySelector('#task-content'),
    }

    const postApp = {
        reviewList : document.querySelector('#review-list'),
        publishedList : document.querySelector('#published-list'),
        btnPublish : document.querySelector('#publish-btn'),
    }

    let postId = 1
    const postInfo = {}


    const checkCorrectInputs = (dataFromInput) => dataFromInput.every(item => item.value.trim().length !== 0)

    const clearInputFields = (dataFromInput => dataFromInput.forEach(x => x.value = ''))

    const editFunctionality = (event) => {
        const id = event.currentTarget.id
        event.currentTarget.parentElement.remove()
        Object.values(inputFields).forEach((x, index) => x.value = postInfo[id][index])
        delete postInfo[id]
    }

    const postFunctionality = (event) => {
        const currentElement = event.currentTarget.parentElement
        postApp.reviewList.removeChild(currentElement)
        Array.from(currentElement.querySelectorAll('button')).forEach(x => x.remove())
        postApp.publishedList.appendChild(currentElement)
    }

    const createTaskHtmlElement = (data) => {
        const li = document.createElement('li')
        li.classList.add('rpost')
        li.innerHTML = `<article>
            <h4>${data.title.value}</h4>
            <p>Category: ${data.category.value}</p>
            <p>Content: ${data.content.value}</p>
        </article>
        <button class="action-btn edit" id="${postId}">Edit</button>
        <button class="action-btn post">Post</button>`

        const [edit, post] = Array.from(li.querySelectorAll('button'))
        edit.addEventListener('click', editFunctionality)
        post.addEventListener('click', postFunctionality)
        postInfo[postId] = []
        Object.values(inputFields).forEach(x => postInfo[postId].push(x.value))
        postId += 1
        return li
    }


    const btnPublishFunctionality = (event) => {
        const data = Object.values(inputFields)

        if (!checkCorrectInputs(data)) return

        postApp.reviewList.appendChild(createTaskHtmlElement(inputFields))

        clearInputFields(data)
    }


    postApp.btnPublish.addEventListener('click', btnPublishFunctionality)
}

