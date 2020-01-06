const express = require('express')
// const  Chess = require('chess.js').Chess;
const app = express()
const server = require('http').createServer(app)
const port = 3000
const mongoose = require('mongoose')
const socketIO = require('socket.io')
const io = socketIO(server)

app.set('view engine', 'ejs')
app.use(express.static('public'))

mongoose.connect('mongodb://dilip:dilip123@dbh43.mlab.com:27437/chessdb', { useNewUrlParser: true })
    .catch(err => {
        console.log(err)
    })

users = [];
connections = [];

io.on('connection', (socket) => {
    connections.push(socket);
    console.log('new user connected! %s %s connections',socket.id, connections.length);

    socket.on('send game', (state) => {
        console.log(state);
        socket.emit('new game', {state:state});
    });
    socket.on('update status', (state) => {
        console.log(state);
        socket.emit('new update', {state:state});
    });

    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket));
        console.log(' user dissconnected ! %s connections', connections.length);
    });
})


app.get('/chess', (req, res) => {
    res.render('index')
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`))
