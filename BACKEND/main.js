const http = require('http')

const server = http.createServer(async (req, res) => {
    const URL = req.url
    const METHOD = req.method
    let FINAL = {}
    res.writeHead(200, {    "Content-Type": "text/json",
        "access-control-allow-origin": "*",
        })
    
    // update post and user
    if(URL === "/posts" && METHOD === "POST") {
        let body = ""
        
        req.on('data', async chunk => {
            // getting the data and set it to json
            body += await chunk.toString('utf-8')
            body = await JSON.parse(body)
            
            // handle user update
            let user = await fetch(`http://127.0.0.1:3000/user/${body.user}`, {method: "GET"})
            let userData = await user.json()
            userData.postedBlog.push({id: body.body.id})
            fetch(`http://127.0.0.1:3000/user/` + body.user, {method: "PATCH", body: JSON.stringify({ postedBlog: userData.postedBlog})})

            // handle posts update
            fetch(`http://127.0.0.1:3000/posts`, {method: "POST", body: JSON.stringify(body.body)})
            .catch(err => console.error('error occured: ', err))
        })

        res.end()
    } else if(URL.includes('posts') && METHOD === 'GET') {

        // search params
        let queryString = URL.split('?')[1]
        let params = new URLSearchParams(queryString)
        let id = params.get('id')

        try{
            // get blog posts
            let body = await fetch(`http://127.0.0.1:3000/posts/${id}`)
            let data = await body.json()

            // get user id
            let user = await fetch(`http://127.0.0.1:3000/user/${data.userid}`)
            let userdata = await user.json()

            FINAL = {condition: true, userid: userdata, body: data}
        }
        catch{
            FINAL = {condition: false, reason: 'Invalid ID or Posts'}
        }
        finally{
            res.end(JSON.stringify(FINAL))
        }
    } else if(URL === '/comment' && METHOD === 'POST') {

        let body = ''

        req.on('data', async chunk => {

            // get the comment and the blog id
            body += await chunk.toString('utf-8')
            body = await JSON.parse(body)

            // getting the blog and updating the blog
            let blog = await fetch(`http://127.0.0.1:3000/posts/${body.blogId}`)
            let userBlog = await blog.json()

            let user = await fetch(`http://127.0.0.1:3000/user/${body.user.id}`)
            let userData = await user.json()

            // random uuid for the comments id
            let randomId = crypto.randomUUID()
            
            // adding the comment to the blog 
            userBlog.comments.push({
                id: randomId,
                user: body.user,
                message: body.comment,
                replies: []
            })

            // adding the comment id to the user
            userData.comments.push({
                id: randomId
            })

            // updating the blog comment
            fetch(`http://127.0.0.1:3000/posts/${body.blogId}`, {method: 'PATCH', body: JSON.stringify({ comments: userBlog.comments })})

            // updating the user comment id
            fetch(`http://127.0.0.1:3000/user/${userData.id}`, {method: 'PATCH', body: JSON.stringify({ userData: userData.comments })})
        })

        res.end()
    }   else {
        res.end(JSON.stringify({condition: false, reason: 'what are you doing in here?'}))
    }
})

server.listen(8080, () => {
    console.log('server is running in port : 8080')
})