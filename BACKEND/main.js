const fs = require('fs')
const ws = require('ws')
const http = require('http')
let previusData = null

const readJsonFile = () => {
    try{
        const data = fs.readFileSync('../API/db.json', "utf-8")
        return JSON.parse(data)
    }
    catch (err){
        console.error(`error occured: `, err)
        return null
    }
}


const server = http.createServer(async (req, res) => {
    const URL = req.url
    const METHOD = req.method
    res.writeHead(200, {    "Content-Type": "application/json",
        "access-control-allow-origin": "*"
        })

    console.log(URL)
    console.log(URL.includes('user'))
    if(URL.includes('user') && METHOD === 'GET') {
        let queryString = URL.split('?')[1]
        let params = new URLSearchParams(queryString)
        let id = params.get('id')

        console.log(id)
        let body = await fetch(`http://127.0.0.1:3000/user/${id}`)
        let userData = await body.json()
        userData.postedBlog.push()

    } else if(URL === "/posts" && METHOD === "POST") {
        let body = ""
    
        req.on('data', chunk => {
            // getting the data and set it to json
            body += chunk.toString()
            body = JSON.parse(body)
        })

        let res = await fetch("http://127.0.0.1:3000/posts", {method: "POST", body: JSON.stringify(body)})
    
        req.on('end', () => {
            console.log(body)
            res.end()
        })
    } else {
        res.end()
    }
})

const wss = new ws.Server({  server })

wss.on('connection', (ws) => {
    console.log('client connected: ', wss.clients.size)
    
    fetch("http://127.0.0.1:3000/posts")
    .then(res => res.json())
    .then(data => {
        ws.send(JSON.stringify(data))
    })
    .catch(err => console.error(`error occured: `, err))
    fs.watchFile("../API/db.json", {interval: 1000}, (curr, prev) => {
        const newData = readJsonFile()
        if(JSON.stringify(newData) !== JSON.stringify(previusData)) {
            console.log("JSON file updated:" ,newData)
            previusData = newData
            ws.send(JSON.stringify(newData))
        }
    })

    ws.on("message", (message) => {
        let data = message.toString("utf-8")

        console.log('received message: ', data)
    })

    ws.on("close", () => {
        console.log('client disconnected: ', wss.clients.size)
    })
})

server.listen(8080, () => {
    console.log('server is running in port : 8080')
})