var e = require('./entities/enemy');
var Timer = require('./entities/entity').Timer;

module.exports = Wave;

function Wave(game) {
	this.timer = new Timer(10, function() {
		var enemy1 = e.create(game, [-50, 150], 'right');
		var enemy2 = e.create(game, [550, 150], 'left');

		game.entities.push(enemy1);
		game.entities.push(enemy2);
	});

	this.update = function(dt) {
		this.timer.update(dt);
	};
}