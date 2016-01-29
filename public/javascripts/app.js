var playerId;

$(function() {
  socket = io();


socket.on('connectPlayer', function(msg) {
  console.log("id", msg);
  playerId = msg;
});

socket.emit('getId', "doesn't matter")

socket.on("id", function (msg) {
  console.log(msg);
})

socket.on('pair', function(role){
  if (role == 1) {
    console.log(role);
    generateGame('safe');
  } else {
    console.log(role);
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

});
function generateGame(type) {
  if (type === 'safe') {
    $('.safe').css('display', 'block');
  } else {
    $('.guide').css('display', 'block');
  }
  timer = 20000;

  setInterval(updateTimer, 1000);
}

function updateTimer() {
  timer -= 1000;
  if (timer <= 0) {
    timer = 0;
    gameOver();
  }
  $('.timer').text('<span>' + new Date(timer) + '</span>');
}

function gameOver() {
  clearInterval(timer);
  $('.guide').css('display', 'none');
  $('.safe').css('display', 'none');
}
