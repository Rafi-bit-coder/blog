const db = require("../API/db.json")
const fs = require('fs')
const ws = require('ws')
const http = require('http')
let previusData = null

const readJsonFile = () => {
    try{
        const data = fs.readFileSync('../API/db.json')
        return JSON.parse(data, "utf8")
    }
    catch (err){
        console.error(`error occured: `, err)
        return null
    }
}


const server = http.createServer((req, res) => {
    res.writeHead(200, {    "Content-Type": "text/plain"    })
    res.end()
})

const wss = new ws.Server({  server })

wss.on('connection', (ws) => {
    console.log('client connected')
    
    // console.log(JSON.stringify(db))
    
    fetch("http://127.0.0.1:3000/posts")
    .then(res => res.json())
    .then(data => {
        ws.send(JSON.stringify(data))
    })
    fs.watchFile("../API/db.json", {interval: 1000}, (curr, prev) => {
        const newData = readJsonFile()
        if(JSON.stringify(newData) !== JSON.stringify(previusData)) {
            console.log("JSON file updated:" ,newData)
            previusData = newData
            ws.send(newData)
        }
    })

    // setInterval(() => {ws.send('hello there')}, 2000)

    ws.on("message", (message) => {
        let data = message.toString("utf-8")

        // if()
        console.log('received message: ', data)
    })

    ws.on("close", () => {
        console.log('client disconnected')
    })
})

server.listen(8080, () => {
    console.log('server is running in port : 8080')
})