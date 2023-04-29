const express = require("express");
const cors = require("cors");
const http = require("http");
const {Server} = require("socket.io");

const app = express();

const server = http.createServer(app);

app.use(cors())

const io = new Server(server,{
    cors : {
        origin : "http://localhost:3000",
        methods : ['GET', 'POST']
    }
})

io.on("connection", (socket)=>{
    console.log(`User connected ${socket.id}`)

    socket.on("join_room", data =>{
        socket.join(data)
    })

    socket.on("send-message", data =>{  //data is an object having room and msg
        socket.to(data.room).emit('receive-msg', data.msg)
    })
    
})

server.listen(4002, ()=>{    //servere here , not app   //You bind socket.io to http, but only app listens on the port (5000). You need to make http listen on that port.
    console.log("Server listening on port 4002")
} )