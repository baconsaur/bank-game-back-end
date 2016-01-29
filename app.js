var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000, function(){
  console.log('listening on localhost:3000');
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.get('/', function(request, response){
  response.render('index');
});

var playerId = 1;
var playerPairs = [];

function matchPlayer(id, socket) {
  for(var i in playerPairs){
    if(!playerPairs[i].player2){
      playerPairs[i].player2 = id;
      return i;
    }
  }
  return createPair(id);
}

function createPair(id) {
  var pairId = playerPairs.length;
  playerPairs[pairId] = {
    player1: id,
    player2: '',
    started: false,
    gameObject: {
      symbolArray: [],
      attempts: 0,
      pairId: pairId
    }
  };
  return pairId;
}

function shuffle() {
  var randomArray = [1,2,3,4,5,6];
  return randomArray;
}

io.on('connection', function(socket){
  console.log("id", playerId);
  socket.emit('connectPlayer', playerId);
  socket.on('getId', function(){
    io.emit('id', playerId);
  });
    var newMatch = matchPlayer(playerId, socket);
    console.log(newMatch);
    console.log(playerPairs[newMatch]);
    playerId++;

    if(playerPairs[newMatch].player1 && playerPairs[newMatch].player2){
      console.log('butt');
      playerPairs[newMatch].gameObject.symbolArray = shuffle();
      console.log(playerPairs[newMatch].gameObject.symbolArray);
      io.emit('start game', JSON.stringify(playerPairs[newMatch]));
    }

    socket.on('chat message', function(message){
      console.log(message);
      io.emit('chat message', message);
    });
});
