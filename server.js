const express = require('express')
const  Chess = require('chess.js').Chess;
const app = express()
const server=require('http').createServer(app)
const port = 3000
const mongoose =require('mongoose')
const socketIO=require('socket.io')
const io=socketIO(server)

app.set('view engine','ejs')
app.use(express.static('public'))

mongoose.connect('mongodb://dilip:dilip123@dbh43.mlab.com:27437/chessdb', {useNewUrlParser: true})
.catch(err=>{
    console.log(err)
})


//chess logic
var chess = new Chess();


//socket logic
io.on('connection',(socket)=>{
    console.log('new user connected!');
    socket.emit('sendBoard',{
        'board':chess.fen()
    });
})


app.get('/chess', (req, res) =>{
    // while (!chess.game_over()) {
    var moves = chess.moves();
    var move = moves[Math.floor(Math.random() * moves.length)];
    chess.move(move);
    var toPass=chess.fen();
    //   }
      // console.log(chess.pgn());
      
    res.render('index',{chess:{
        board:toPass,
    }})
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`))
