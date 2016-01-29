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
  if (role === 1) {
    console.log(role);
    // generateGame('safe');
  } else {
    console.log(role);
    // generateGame('guide');
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

// function generateGame(type) {
//   var Game = React.createClass({
//     getInitialState: function(){
//       return {player_type: type};
//     },
//     handleChange: function(event) {
//
//     },
//     render: function() {
//       if (this.state.type === 'safe') {
//         return <div class="safe">
//
//         </div>;
//       } else {
//         return <div class="guide">
//
//         </div>;
//       }
//     }
//   });
//
//   ReactDOM.render(
//     <Game />,
//     document.getElementById('game');
//   );
//
//   gameLoop();
// }
//
// function gameLoop() {
//
// }

});
