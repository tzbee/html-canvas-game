var Entity = require('./entity');
var Sprite = require('../sprite');
var Timer = Entity.Timer;
var explosion = require('./explosion');

var bullet = {};

module.exports = bullet;

bullet.create = function(game, pos, direction, sideIndex) {
	var down = new Sprite('img/bullet2.png', [
			[
				[31, 46],
				[12, 15]
			]
		], 1),
		up = new Sprite('img/bullet2.png', [
			[
				[30, 12],
				[12, 15]
			]
		], 1),
		left = new Sprite('img/bullet2.png', [
			[
				[10, 30],
				[15, 12]
			]
		], 1),
		right = new Sprite('img/bullet2.png', [
			[
				[47, 30],
				[15, 12]
			]
		], 1);

	var bulletSpriteMap = {
		'down': down,
		'up': up,
		'left': left,
		'right': right,
	};

	var b = new Entity({
		game: game,
		sideIndex: sideIndex,
		pos: pos,
		size: [12, 15],
		direction: direction,
		speed: 300,
		timers: [new Timer(0, function() {
			if (!b.isMoving || !b.active) {
				b.explode();
			}
		})]
	});

	b.sprite = bulletSpriteMap[b.direction];
	b.moveDistance(200, b.direction);

	b.explode = function() {
		var exp = explosion.create(b.game, b.pos.slice());
		game.entities.push(exp);
	};

	return b;
};