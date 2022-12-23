const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer((req, res) => {
    res.end("Socket server is running");
})

const io = socketIo(server, { cors: { origin: "*" } });

let online = 0;

io.on("connection", (socket, req) => {
    online += 1;
    socket.emit("message", "Welcome to the websocket server");
    socket.on("message", (m) => {
        socket.emit("hi", m);
    })
})

server.listen(8000, () => {
    console.log("Socket server is running");
})