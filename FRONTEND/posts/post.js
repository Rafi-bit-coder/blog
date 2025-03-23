const container = document.querySelector('.container')
const BLOG_POST = document.querySelector('.blog-post')
const BLOG_CREATOR = document.querySelector('.blog-creator')
const urlparam = new window.URLSearchParams(document.location.search)
const id = urlparam.get('id')

fetch(`http://127.0.0.1:8080/posts?id=${id}`)
.then()
// fetch(`http://127.0.0.1:3000/posts?id=${id}`)
// .then(res => res.json())
// .then(res => {
//     let data = res[0]
//     fetch(`http://127.0.0.1:3000/user?userId=${data.userId}`)
//     .then(response => response.json())
//     .then(response => {
//         let userInfo = response[0]
//         BLOG_POST.innerHTML = `
//             <h1>${data.blog_name}</h1>
//             <p>${data.point}</p>
//         `

//         BLOG_CREATOR.innerHTML = `
//             <h2>Creator: ${userInfo.userName}</h2>
//         `
//     })
// })