// const fs = require('fs')
// const ws = require('ws')
const { copyFileSync } = require('fs')
const http = require('http')
let previusData = null

// const readJsonFile = () => {
//     try{
//         const data = fs.readFileSync('../API/db.json', "utf-8")
//         return JSON.parse(data)
//     }
//     catch (err){
//         console.error(`error occured: `, err)
//         return null
//     }
// }


const server = http.createServer(async (req, res) => {
    const URL = req.url
    const METHOD = req.method
    res.writeHead(200, {    "Content-Type": "application/json",
        "access-control-allow-origin": "*"
        })

    console.log(URL)

    // update user
    // if(URL.includes('user') && METHOD === 'GET') {

    //     search params
    //     let queryString = URL.split('?')[1]
    //     let params = new URLSearchParams(queryString)
    //     let id = params.get('id')

    //     console.log(userData)
    //     res.end()
    //     return null
    // }
    
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

        // let res = await fetch("http://127.0.0.1:3000/posts", {method: "POST", body: JSON.stringify(body)})
    
        req.on('end', () => {
            // console.log(body)
            res.end()
        })
    } else if(URL.includes('posts') && METHOD === 'GET') {

        // search params
        let queryString = URL.split('?')[1]
        let params = new URLSearchParams(queryString)
        let id = params.get('id')

        let body = await fetch(`http://127.0.0.1:3000/posts?id=${id}`)
        let data = await body.json()
        res.end(JSON.stringify(data))
    }   else {
        res.end()
    }
})

// using websocket

// const wss = new ws.Server({  server })

// wss.on('connection', (ws) => {
//     console.log('client connected: ', wss.clients.size)
    
//     fetch("http://127.0.0.1:3000/posts")
//     .then(res => res.json())
//     .then(data => {
//         ws.send(JSON.stringify(data))
//     })
//     .catch(err => console.error(`error occured: `, err))
//     fs.watchFile("../API/db.json", {interval: 1000}, (curr, prev) => {
//         const newData = readJsonFile()
//         if(JSON.stringify(newData) !== JSON.stringify(previusData)) {
//             console.log("JSON file updated:" ,newData)
//             previusData = newData
//             ws.send(JSON.stringify(newData))
//         }
//     })

//     ws.on("message", (message) => {
//         let data = message.toString("utf-8")

//         console.log('received message: ', data)
//     })

//     ws.on("close", () => {
//         console.log('client disconnected: ', wss.clients.size)
//     })
// })

server.listen(8080, () => {
    console.log('server is running in port : 8080')
})