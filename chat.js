const express = require("express");
const cors = require('cors');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8000;
const app = express();

// app middleware
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

const io = socketIo(expressServer);


io.on("connection", (socket) => {
    socket.emit("conn", { data: "Welcome to the socketIo server", id: socket.conn.id });
    fs.watch(path.join(__dirname + "/public" + "/index.html"), function (event, filename) {
        if (event == 'change') {
            socket.emit("change", { data: "File is changed" });
        }
    });
    socket.on("newMessage", (msg) => {
        io.emit("sentMessage", { text: msg, id: socket.conn.id });
    });
});
