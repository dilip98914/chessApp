const express = require('express')
const app = express()
const port = 3000

const mongoose =require('mongoose')
mongoose.connect('mongodb://dilip:dilip123@dbh43.mlab.com:27437/chessdb', {useNewUrlParser: true})
.catch(err=>{
    console.log(err)
})

app.set('view engine','ejs')

app.use(express.static('public'))

var Chess = require('chess.js').Chess;
var chess = new Chess();

while (!chess.game_over()) {
  var moves = chess.moves();
  var move = moves[Math.floor(Math.random() * moves.length)];
  chess.move(move);
}
console.log(chess.pgn());

app.get('/', (req, res) =>{
    res.render('index',{data:{
        name:'dilip',
        age:34
    }})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
