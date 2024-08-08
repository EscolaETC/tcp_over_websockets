const net = require("net");
const socketioclient = require("socket.io-client");
const readline = require('readline');

//& "C:\Users\alunoetc\nodejs\node.exe"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question(`Server id: `, id => {
    const socket = socketioclient.io("https://" + id + ".ngrok-free.app"); 

    var server = net.createServer(function(sockettcp) {
        sockettcp.on("data", (data) => {
            console.log(data)
            //<Buffer 0f 00 05 09 6c 6f 63 61 6c 68 6f 73 74 23 28 01 01 00>
            if (data[0] == 0x0f && data[1] == 0x00 && data[2] == 0x05 && data[3] == 0x09 && data[4] == 0x6c && data[5] == 0x6f &&
                data[6] == 0x63 && data[7] == 0x61 && data[8] == 0x6c && data[9] == 0x68 && data[10] == 0x6f && data[11] == 0x73 &&
                data[12] == 0x74 && data[13] == 0x23 && data[14] == 0x28 && data[15] == 0x01 && data[16] == 0x01 && data[17] == 0x00
            ){
                console.log("sim")
                return;
            }
            socket.emit("game_client", data);
        })

        socket.on("game_server", (data) => {
            sockettcp.write(data);
        })
    });
    
    server.listen(9000, '127.0.0.1');

    rl.close();
});