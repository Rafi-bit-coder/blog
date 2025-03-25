const container = document.querySelector('.container')
const BLOG_POST = document.querySelector('.blog-post')
const BLOG_CREATOR = document.querySelector('.blog-creator')
const urlparam = new window.URLSearchParams(document.location.search)
const id = urlparam.get('id')

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
})
.catch(err => {container.textContent = `tell the CS that the posts page is broken`; console.error(`error occured: `, err)})