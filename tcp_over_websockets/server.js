const net = require("net");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

//& "C:\Users\alunoetc\nodejs\node.exe"

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server);

var g_socket;

const clients = {}

io.on("connection", (socket) => {
    console.log("Client connected", socket.id);
    clients[socket.id] = new net.Socket();
    g_socket = socket;

    socket.on("game_client", (data) => {
        clients[socket.id].write(data);
    })

    clients[socket.id].connect(25565, '127.0.0.1', function() {
        console.log('Connected');
    });

    clients[socket.id].on('data', function(data) {
        socket.emit("game_server", data);
    });
});

server.listen(8000, () => {
    console.log("Server is running on port 8000");
})