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
    }

}

POST_BUTTON.onclick = POST_BLOG