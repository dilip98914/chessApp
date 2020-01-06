var socket = io();


var $turn = $('#turn')
var $status = $('#status')
var $fen = $('#fen')
var $pgn = $('#pgn')

var playerColor = 'w'

function intializeBoard(pos){
  var config = {
    orientation: 'black',
    position: pos,
    showNotation: false,
    draggable: true,
    dropOffBoard: 'snapback', // this is the default,
    onDragStart: onDragStart,
    onDrop: onDrop,
  }
  
  var board = Chessboard('chessBoard', config);
  return board;  
}

var game = new Chess()
var board =intializeBoard('start');


socket.on('connect', () => {
  console.log('client connected to server! %s',socket.id);
  updateStatus();
  // socket.emit('send game', { state:board.fen() });
  // $status.html(status)
  // $fen.html(game.fen())
  // $pgn.html(game.pgn())
})
socket.on('new game', function (state) {
  // console.log(state.state.state);
  // console.log(state);
  // var board = Chessboard('chessBoard', config);
  // let s=state.state.state.toString();
  // console.log(s);
  // console.log(state);
  board.position(state);
  // board.move();
})


// socket.on('new update',function(state){
//   console.log(state.state.board);
//   board.position(state.state.board,false);
// })

function onDragStart(src, piece, position, orientation) {
  if (game.game_over()) return false
  // if(game.turn()=='w' && piece.search(/^b/)!==-1 ||
  //     piece.search(/^w/)!==-1 ){
  //         return false
  //     }
}


let currentEdit;
function onDrop(src, target) {
  var move = game.move({
    from: src,
    to: target,
    promotion: 'q'
  })

  if (move == null) return 'snapback';
  game.move(move);
  currentEdit=game.fen();
  // if(game.turn()!==playerColor) return 'snapback';

  updateStatus();
}

function updateStatus() {
  // console.log('update is called');
  var status = ''
  var moveColor = 'White'
  if (game.turn() == 'b') moveColor = 'Black'
  if (moveColor == 'Black') {
    $turn.html("black")
  } else if (moveColor == 'White') {
    $turn.html('White')
  }
  if (game.in_checkmate()) {
    console.log('cheeckmate');
    status = 'Game Over,' + moveColor + 'is in checkmate.'
  } else if (game.in_draw()) {
    status = 'Game Over,drawn position'
    console.log('drawn');

  } else {
    status = moveColor + 'to_move'
    if (game.in_check()) {
      status += ',' + moveColor + 'is in check'
      console.log('check');
    }
  }
  socket.emit('send game',currentEdit);
}


