const container = document.querySelector('.container')

fetch('http://127.0.0.1:3000/posts', {method: "GET"})
.then(res => res.json())
.catch(error => console.error(`something is error: ${error}`))
.then(data => {
    data.map(post => {
        container.innerHTML += `
            <a href="/FRONTEND/posts/?id=${post.id}&blog=${post.blog_name}" class="posts ${post.id}">
                <h2>${post.blog_name}</h1>
                <p>${post.point}</p>
            </a>
        `
    })
})
