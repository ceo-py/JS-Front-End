function attachEvents() {
    const [btnLoadPosts, btnViewPost] = Array.from(document.querySelectorAll('button'))
    const posts = document.querySelector('#posts')
    const postTitle = document.querySelector('#post-title')
    const postBody = document.querySelector('#post-body')
    
    let postInfo = {}
    const postsApiUrl = 'http://localhost:3030/jsonstore/blog/posts'
    const commentsApiUrl = 'http://localhost:3030/jsonstore/blog/comments'

    function createElementWithValueAndTextContent(tag, value, textContent) {
        const e = document.createElement(tag)
        e.value = value
        e.textContent = textContent
        return e
    }
    
    function findPost(selected) {
        for (const key in postInfo) {
            if (selected === postInfo[key].id) {
                return postInfo[key]
            }
        }
    }
    
    
    btnLoadPosts.addEventListener('click', () => {
        fetch(postsApiUrl).then(x => x.json()).then(x => {
            postInfo = x
            for (const key in x) {
                posts.appendChild(createElementWithValueAndTextContent('option', x[key].id, x[key].title))
            }
        }).catch()
    })

    btnViewPost.addEventListener('click', () => {
        fetch(commentsApiUrl).then(x => x.json()).then(x => {
            let post = findPost(posts.value)
            postTitle.textContent = post.title
            postBody.textContent = post.body
            const boby = document.querySelector('body')
            const ul = document.querySelector('#post-comments')
            
            boby.removeChild(ul)
            
            const newUl = document.createElement('ul')
            newUl.setAttribute('id', 'post-comments')
            boby.appendChild(newUl)
            const postComments = document.querySelector('#post-comments')
            
            for (const key in x) {
                if (x[key].postId === posts.value) {
                    const l = document.createElement('li')
                    l.textContent = x[key].text
                    postComments.appendChild(l)
                }
            }
        }).catch()
    })

}

attachEvents();
