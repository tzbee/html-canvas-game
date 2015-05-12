var Entity = require('./entity');
var Sprite = require('../sprite');
var Timer = Entity.Timer;
var bullet = require('./bullet');

var character = {};

character.create = function(options) {
	options = options || {};
	var spriteMap = createSpriteMap();

	var c = new Entity({
		game: options.game,
		sideIndex: options.sideIndex || 0,
		pos: options.pos,
		direction: options.direction,
		size: [32, 32],
		timers: [new Timer(0, function(dt) {
			if (c.isMoving) {
				c.sprite.update(dt);
			}

			c.sprite = c.spriteMap[c.direction];
		})]
	});

	c.spriteMap = spriteMap;
	c.sprite = c.spriteMap[c.direction];
	c.shoot = shoot;

	return c;
};

var createSpriteMap = function() {
	var frameSize = [32, 32];
	var frameWidth = frameSize[0];
	var frameHeight = frameSize[1];

	var downLineHeight = 0;
	var leftLineHeight = frameHeight;
	var rightLineHeight = frameHeight * 2;
	var upLineHeight = frameHeight * 3;

	var speed = 8;

	var downFrames = [
		[
			[0, downLineHeight], frameSize
		],
		[
			[frameWidth, downLineHeight], frameSize
		],
		[
			[2 * frameWidth, downLineHeight], frameSize
		]
	];
	var leftFrames = [
		[
			[0, leftLineHeight], frameSize
		],
		[
			[frameWidth, leftLineHeight], frameSize
		],
		[
			[2 * frameWidth, leftLineHeight], frameSize
		]
	];
	var rightFrames = [
		[
			[0, rightLineHeight], frameSize
		],
		[
			[frameWidth, rightLineHeight], frameSize
		],
		[
			[2 * frameWidth, rightLineHeight], frameSize
		]
	];
	var upFrames = [
		[
			[0, upLineHeight], frameSize
		],
		[
			[frameWidth, upLineHeight], frameSize
		],
		[
			[2 * frameWidth, upLineHeight], frameSize
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

function shoot() {
	var b = bullet.create(this.game, this.pos.slice(), this.direction, this.sideIndex);
	this.game.entities.push(b);
}

module.exports = character;