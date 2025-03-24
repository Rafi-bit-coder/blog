// const ws = new WebSocket("http://localhost:8080")
// let connected = false

// using websocket

// ws.onopen = () => {
//     connected = true
//     console.log('connected to server')
//     ws.send("hello server")
// }

// ws.onmessage = (event) => {
//     let data = JSON.parse(event.data)
//     data.map(post => {
//         container.innerHTML += `
//             <a href="/posts/?id=${post.id}&blog=${post.blog_name}" class="posts ${post.id}">
//                 <h2>${post.blog_name}</h1>
//                 <p>${post.point}</p>
//             </a>
//         `
//     })
//     console.log('data dari server: ', data)
// }

// ws.onclose = () => {
//     connected = false
//     console.log('disconnected from server')
// }

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
