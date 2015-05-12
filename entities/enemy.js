var c = require('./character');

var enemy = {};

module.exports = enemy;

enemy.create = function(game, pos, direction) {
	var e = c.create({
		game: game,
		pos: pos,
		direction: direction,
		sideIndex: 2
	});

	e.moveDistance(2000, direction);

	return e;
};