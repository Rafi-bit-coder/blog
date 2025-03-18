const ws = require('ws')
const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, {    "Content-Type": "text/plain"    })
    res.end()
})

const wss = new ws.Server({  server })

wss.on('connection', (ws) => {
    console.log('client connected')

    // setInterval(() => {ws.send('hello there')}, 2000)

    ws.on("message", (message) => {
        let data = message.toString("utf-8")
        console.log('received message: ', data)
    })

    ws.on("close", () => {
        console.log('client disconnected')
    })
})

server.listen(8080, () => {
    console.log('server is running in port : 8080')
})