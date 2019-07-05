var express = require("express");
var app = express();
const portNumber = process.env.PORT || '3000'
var server = require('http').createServer(app);
var io = require("socket.io")(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

io.on('connection', (socket)=> {
  console.log("A user has connected")
  io.emit("chat message", "User connected")

  socket.on('disconnect', () => {
    io.emit('chat message', "User disconected")
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(portNumber, (req, res) => {
  console.log(`Listening on: ${portNumber}!`)
});

app.use(express.static(__dirname + "/public"));
