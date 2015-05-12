var Entity = require('./entity');
var Sprite = require('../sprite');
var Timer = require('./entity').Timer;

function Pawn(game, pos) {
	Entity.call(this, game, createSpriteMap(), pos);

	var actionTimer = new Timer(1, this.shoot.bind(this));

	var moveTimer = new Timer(7, function() {
		var direction = ['down', 'up', 'left', 'right'][Math.floor(Math.random() * 4)];
		this.moveDistance(100, direction);
	}.bind(this));

	this.timers.push(actionTimer);
	this.timers.push(moveTimer);
}

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

Pawn.prototype = Object.create(Entity.prototype);


Pawn.prototype.update = function(dt) {

	Entity.prototype.update.call(this, dt);

	// If the entity is moving
	if (this.movingState.isMoving) {

		// Update sprites
		this.sprites[this.movingState.direction].update(dt);

		// Update position
		this.move(this.movingState.direction, dt);
	}
};

Pawn.prototype.shoot = function() {
	var game = this.game;
	var pos = this.pos;

	game.addBullet([pos[0] + 16 - 6, pos[1] + 16 - 7], this.movingState.direction);
};

module.exports = Pawn;