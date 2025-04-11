const container = document.querySelector('.container')
const urlparam = new window.URLSearchParams(document.location.search)
const id = urlparam.get('id')

// blog container
const BLOG_POST = document.querySelector('.blog-post')
const BLOG_CREATOR = document.querySelector('.blog-creator')

// comment section
const comment_container = document.querySelector('.comment-point')
const comment_value = document.querySelector('.add-comment')
const post_comment = document.querySelector('.post-comment')

comment_value.addEventListener('input', (e) => {
    autoResize(e.target)
    e.target.value.length !== 0 ? post_comment.classList.add('show') : post_comment.classList.remove('show')
})

function autoResize(textArea) {
    textArea.style.height = 'auto'
    textArea.style.height = textArea.scrollHeight + 'px'
}

function postCommen () {
    let value = comment_value.value
    console.log(value)
}

post_comment.onclick = postCommen

fetch(`http://127.0.0.1:8080/posts?id=${id}`, {method: "GET"})
.then(res => res.json())
.then(data => {
    console.log(data)
    BLOG_POST.innerHTML = `
        <h1>${data.body.blog_name}</h1>
        <h3>${data.body.point}</h3>
    `
    BLOG_CREATOR.innerHTML = `
        <h2>${data.userid.userName}</h2>
    `
    if(data.body.comments?.length) {
        console.log('ada')
        data.body.comments?.map(a => {
            comment_container.innerHTML = `
                <div class="comments ${a.id}" >
                    <i class="fa-solid fa-circle-user"></i>
                    <a href="#${a.user.id}">${a.user.username}</a>
                    <p>${a.message}</p>
                </div>
            `
        })
    } else {
        console.log('tidak')
        comment_container.textContent = `no one has comment yet`
    }
})
.catch(err => {container.textContent = `tell the CS that the posts page is broken`; console.error(`error occured: `, err)})