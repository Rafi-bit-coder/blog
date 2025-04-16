let temporary = {
    id: '12asgd',
    userName: 'Developer',
    avatar: ''
}

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
    fetch(`http://127.0.0.1:8080/comment`, {method: 'POST', body: JSON.stringify({blogId: id, comment: value,
        user: temporary
    })})
}

post_comment.onclick = postCommen

fetch(`http://127.0.0.1:8080/posts?id=${id}`, {method: "GET"})
.then(res => res.json())
.then(data => {
    console.log(data)
    if(data.condition) {
        BLOG_POST.innerHTML = `
            <h1>${data.body.blog_name}</h1>
            <h3>${data.body.point}</h3>
        `
        BLOG_CREATOR.innerHTML = `
            <h2>${data.userid.userName}</h2>
        `
        if(data.body.comments?.length) {
            data.body.comments?.map(a => {
                comment_container.innerHTML += `
                    <div class="comments ${a.id}" >
                        <i class="fa-solid fa-circle-user"></i>
                        <a href="#${a.user.id}">${a.user.userName}</a>
                        <p>${a.message}</p>
                    </div>
                `
            })
        } else {
            comment_container.textContent = `no one has comment yet`
        }
    } else {
        document.getElementsByTagName('body')[0].innerHTML = data.reason
    }
})
.catch(err => {container.textContent = `tell the CS that the posts page is broken`; console.error(`error occured: `, err)})