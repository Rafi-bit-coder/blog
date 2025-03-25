const http = require('http')

const server = http.createServer(async (req, res) => {
    const URL = req.url
    const METHOD = req.method
    res.writeHead(200, {    "Content-Type": "application/json",
        "access-control-allow-origin": "*"
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

        // get blog posts
        let body = await fetch(`http://127.0.0.1:3000/posts/${id}`)
        let data = await body.json()

        // get user id
        let user = await fetch(`http://127.0.0.1:3000/user/${data.userid}`)
        let userdata = await user.json()
        res.end(JSON.stringify({userid: userdata, body: data}))
    }   else {
        res.end()
    }
})

server.listen(8080, () => {
    console.log('server is running in port : 8080')
})