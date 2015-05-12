var c = require('./character');
var Timer = require('./entity').Timer;
var Sprite = require('../sprite');

var hero = {};

module.exports = hero;

hero.create = function(game, pos, direction) {
	var e = c.create({
		game: game,
		pos: pos,
		direction: direction
	});

	e.spriteMap = createSpriteMap();
	e.sprite = e.spriteMap[e.direction];

	e.timers.push(new Timer(0, function() {
		var entities = game.entities;
		var thisIndex = entities.indexOf(e);

		for (var i = 0; i < entities.length; i++) {
			if (i != thisIndex) {
				var entity = entities[i];
				if (inRadius(e.pos[0], e.pos[1], e.size[0], e.size[1], entity.pos[0], entity.pos[1], entity.size[0], entity.size[1], 100)) {
					console.log('In radius!!!!');
				}
			}
		}
	}));

	return e;
};

var createSpriteMap = function() {
	var frameSize = [32, 32];
	var frameWidth = frameSize[0];
	var frameHeight = frameSize[1];

	var downLineHeight = 0;
	var leftLineHeight = frameHeight;
	var rightLineHeight = frameHeight * 2;
	var upLineHeight = frameHeight * 3;

	var speed = 5;

	var downFrames = [
		[
			[6 * frameWidth, downLineHeight], frameSize
		],
		[
			[7 * frameWidth, downLineHeight], frameSize
		],
		[
			[8 * frameWidth, downLineHeight], frameSize
		]
	];
	var leftFrames = [
		[
			[6 * frameWidth, leftLineHeight], frameSize
		],
		[
			[7 * frameWidth, leftLineHeight], frameSize
		],
		[
			[8 * frameWidth, leftLineHeight], frameSize
		]
	];
	var rightFrames = [
		[
			[6 * frameWidth, rightLineHeight], frameSize
		],
		[
			[7 * frameWidth, rightLineHeight], frameSize
		],
		[
			[8 * frameWidth, rightLineHeight], frameSize
		]
	];
	var upFrames = [
		[
			[6 * frameWidth, upLineHeight], frameSize
		],
		[
			[7 * frameWidth, upLineHeight], frameSize
		],
		[
			[8 * frameWidth, upLineHeight], frameSize
		]
	];

	var sprites = {
		'down': new Sprite('img/rpg.png', downFrames, speed),
		'up': new Sprite('img/rpg.png', upFrames, speed),
		'left': new Sprite('img/rpg.png', leftFrames, speed),
		'right': new Sprite('img/rpg.png', rightFrames, speed)
	};

	return sprites;
};

function inRadius(x, y, w, h, x1, y1, w1, h1, expectedRadius) {
	var center = [x + w / 2, y + h / 2];
	var center2 = [x1 + w1 / 2, y1 + h1 / 2];

	var actualRadius = distanceTo(center, center2);

	return actualRadius <= expectedRadius;
}

function distanceTo(pos1, pos2) {
	var dx = Math.abs(pos1[0] - pos2[0]);
	var dy = Math.abs(pos1[1] - pos2[1]);

	var distance = Math.floor(Math.sqrt(dx * dx + dy * dy));
	return distance;
}