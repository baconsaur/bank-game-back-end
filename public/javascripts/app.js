var playerId;

$(function() {
  var socket = io();
});

socket.on('connect', function(player_id) {
  playerId = player_id;
});

socket.on('pair', function(role){
  if (role === 1) {
    generateGame('safe');
  } else {
    generateGame('guide');
  }
});

// socket.on('chat message', function(message) {
//
// });

function generateGame(type) {
  var Game = React.createClass({
    getInitialState: function(){
      return {player_type: type};
    },
    handleChange: function(event) {

    },
    render: function() {
      if (this.state.type === 'safe') {
        return <div class="safe">

        </div>;
      } else {
        return <div class="guide">

        </div>;
      }
    }
  });

  ReactDOM.render(
    <Game />,
    document.getElementById('game');
  );

  gameLoop();
}

function gameLoop() {

}
