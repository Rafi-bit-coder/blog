const username = "12asgd"
const POST_BUTTON = document.querySelector('.post-blog')
const POINT_TEXT = document.querySelector('.post-point')
const POST_NAME = document.querySelector('.post-name')
const info = document.querySelector('.text-info')

POST_NAME.addEventListener("keydown", (e) => {
    if (POST_NAME.textContent.length >= 35 && e.key !== "Backspace") {
        e.preventDefault(); // Stop extra input
        info.textContent = "Cannot write more than that";
    }
});

// POST_NAME.addEventListener("change", overWrite)

// function overWrite() {
//     console.log(POST_NAME.textContent.length)
//     if(POST_NAME.textContent.length > 35) {
//         POST_NAME.textContent = POST_NAME.textContent.slice(34, POST_NAME.textContent.length)
//         info.textContent = "cannot write more than that"
//         console.log('test')
//     } else {
//         info.textContent = ""
//     }
// }

async function POST_BLOG() {
    if(POINT_TEXT.textContent === '') {
        alert('ndda ada isinya kodong')
    } else {
        let blogid = crypto.randomUUID()    //unique blog id

        const blog = {
            id: username + ' - ' + blogid,
            userid: username,
            blog_name: POST_NAME.textContent,
            point: POINT_TEXT.textContent,
            comment: [

            ],
            up: 0,
            down: 0,
        }

        // user data update
        let response = await fetch(`http://127.0.0.1:8080/posts`, {method: "POST", body: JSON.stringify({user: username, body: blog})})

        // old method
        // let userData = await response.json()
        // userData.postedBlog.push({id: username + " - " + blogid })
        // console.log(userData.postedBlog)
        
        // fetch("http://localhost:8080/posts", {method: "POST", body: JSON.stringify(blog) })
        // let data = await res.json()
        // info.textContent = data
        // fetch('http://127.0.0.1:3000/posts', {method: "POST", body: JSON.stringify(blog)})
        // fetch('http://127.0.0.1:3000/user/' + username, {method: "PATCH", body: JSON.stringify({  postedBlog: userData.postedBlog })})
    }

}

POST_BUTTON.onclick = POST_BLOG

// POST_BUTTON.addEventListener('click', () => {
//     let blogid = crypto.randomUUID()
//     if(POINT_TEXT.textContent === '') {
//         alert('ndda ada isinya')
//     } else {
//         const blog = {
//             id: '12asgd - ' + blogid,
//             userid: '12asgd',
//             blog_name: POST_NAME.textContent,
//             point: POINT_TEXT.textContent,
//             comment: [

//             ],
//             up: 0,
//             down: 0

//         }
//         fetch('http://127.0.0.1:3000/posts', {method: 'POST', body: JSON.stringify(blog)})
//     }
// })

// POST_NAME.addEventListener('onchange', (e) => {
//     console.log(e)
// })