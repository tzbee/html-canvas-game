var Entity = require('./entity');
var Sprite = require('../sprite');
var Timer = Entity.Timer;

var explosion = {};

module.exports = explosion;

explosion.create = function(game, pos) {

	var sprite = new Sprite('img/bullet2.png', [
		[
			[109, 83],
			[19, 18]
		]
	], 20, true);


	var expl = new Entity({
		game: game,
		pos: pos,
		size: [19, 18],
		sideIndex: 3,
		sprite: sprite,
		timers: [new Timer(0, function(dt) {
			if (!expl.active) return;

			if (expl.sprite.done) {
				expl.active = false;
				return;
			}

			expl.sprite.update(dt);
		})]
	});

	return expl;
};