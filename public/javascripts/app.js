var playerId;

$(function() {
  var socket = io();
});

socket.on('connect', function(player_id) {
  playerId = player_id;
});

socket.on('pair', function(role){
  if (role == 1) {
    generateGame('safe');
  } else {
    generateGame('guide');
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

function generateGame(type) {
  if (type === 'safe') {
    $('.safe').css('display', 'block');
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
