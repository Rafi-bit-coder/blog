const username = "12asgd"
const POST_BUTTON = document.querySelector('.post-blog')
const POINT_TEXT = document.querySelector('.post-point')
const POST_NAME = document.querySelector('.post-name')


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
        let response = await fetch('http://127.0.0.1:3000/user/12asgd')
        let userData = await response.json()
        userData.postedBlog.push({id: username + " - " + blogid })
        console.log(userData.postedBlog)
        
        fetch('http://127.0.0.1:3000/posts', {method: "POST", body: JSON.stringify(blog)})
        fetch('http://127.0.0.1:3000/user/' + username, {method: "PATCH", body: JSON.stringify({  postedBlog: userData.postedBlog })})
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