var playerId;
var pairId;

$(function() {
  socket = io();


  socket.on('connectPlayer', function(msg) {
    console.log("id", msg);
    if(!playerId) {
      playerId = msg;
    }
  });

  socket.emit('getId', ' ');

  socket.on("id", function (msg) {
  });

  socket.on('start game', function(pairObject){
    pairObject = JSON.parse(pairObject);
    if(!pairId) {
      var type;
      if (pairObject.player1 === playerId) {
        type = 'safe';
      } else if (pairObject.player1 === playerId) {
        type = 'guide';
      } else {
        return;
      }
      pairId = pairObject.gameObject.pairId;
      console.log(pairId);
      generateGame(type);
    }
  });

  socket.on('chat message', function(message) {
    $('.chat>ul').append('<li>' + message + '</li>');
  });

  $('form').submit(function(event){
    event.preventDefault();
    socket.emit('chat message', $('input').val());
    $('input').val('');
  });

});

function generateGame(type) {
  if (type === 'safe') {
    $('.safe').css('display', 'block');
    var $symbols = $('.safe > .symbol');
    for (var i in $symbols) {
      $symbols[i].attr('id', i).css('background-image', 'images/' + i + '.png');
    }
    $symbols.click(function(event){
      socket.emit('symbol select', {pair: pairId, target: event.target.id});
    });
  } else {
    $('.guide').css('display', 'block');
  }
  timer = 120000;

  setInterval(updateTimer, 1000);
}

function updateTimer() {
  timer -= 1000;
  if (timer <= 0) {
    timer = 0;
    gameOver();
  }
  $('.timer').html('<span>' + new Date(timer) + '</span>');
}

function gameOver() {
  clearInterval(timer);
  $('.guide').css('display', 'none');
  $('.safe').css('display', 'none');
}
