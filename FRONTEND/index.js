const ws = new WebSocket("ws://localhost:8080")

ws.onopen = () => {
    console.log('connected to server')
    ws.send("hello server")

}

ws.onmessage = (event) => {
    console.log('data dari server: ', event.data)
}

ws.onclose = () => {
    console.log('disconnected from server')
}

const container = document.querySelector('.container')

// fetch('http://127.0.0.1:3000/posts')
// .then(res => res.json())
// .catch(error => console.error(`something is error: ${error}`))
// .then(data => {
//     data.map(post => {
//         container.innerHTML += `
//             <a href="/posts/?id=${post.id}&blog=${post.blog_name}" class="posts ${post.id}">
//                 <h2>${post.blog_name}</h1>
//                 <p>${post.point}</p>
//             </a>
//         `
//     })
// })
