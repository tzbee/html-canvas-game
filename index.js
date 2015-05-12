var ctx = document.getElementById('myCanvas').getContext('2d');

var Game = require('./game');
var game = new Game(ctx);

game.start();
