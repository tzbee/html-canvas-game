var Timer = require('../timer.js');

function Entity(options) {
	var self = this;

	options = options || {};

	this.game = options.game;
	this.active = true;

	this.speed = options.speed || 40;
	this.size = options.size || [10, 10];

	this.rgb = options.rgb || [0, 0, 0];

	this.pos = options.pos || [10, 10];
	this.directions = {
		down: [false, 0],
		up: [false, 0],
		left: [false, 0],
		right: [false, 0]
	};

	// Move to random direction every 4 seconds
	this.moveTimer = new Timer(1, function() {
		var randomDirection = ['right', 'left', 'up', 'down'][Math.floor(Math.random() * 4)];
		self.moveDistance(randomDirection, 20);
	});

	this.copyTimer = new Timer(2, function() {
		self.copy();
	});
}

function toRGBString(rgb) {
	return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
}

Entity.prototype.render = function(ctx) {
	ctx.save();

	ctx.fillStyle = toRGBString(this.rgb);
	ctx.fillRect(this.pos[0], this.pos[1], this.size[0], this.size[1]);

	ctx.restore();
};

Entity.prototype.update = function(dt) {
	this.copyTimer.update(dt);
	this.moveTimer.update(dt);
	this.move(dt);
};

Entity.prototype.move = function(dt) {
	var directions = this.directions;
	var distance = this.speed * dt;
	var dir;

	if (directions.left[0]) {
		this.pos[0] -= distance;
		dir = directions.left;
		dir[1] -= distance;
		dir[0] = dir[1] > 0;
	}
	if (directions.right[0]) {
		this.pos[0] += distance;
		dir = directions.right;
		dir[1] -= distance;
		dir[0] = dir[1] > 0;
	}
	if (directions.up[0]) {
		this.pos[1] -= distance;
		dir = directions.up;
		dir[1] -= distance;
		dir[0] = dir[1] > 0;
	}
	if (directions.down[0]) {
		this.pos[1] += distance;
		dir = directions.down;
		dir[1] -= distance;
		dir[0] = dir[1] > 0;
	}
};

Entity.prototype.moveDistance = function(direction, distance) {
	var dir = this.directions[direction];
	dir[0] = true;
	dir[1] = distance;
};

Entity.prototype.copy = function() {
	var self = this;
	var game = self.game;

	var copyEntity = new Entity({
		game: game,
		pos: self.pos.slice(),
		size: self.size.slice(),
		speed: self.speed + 20,
		rgb: [self.rgb[0] + 20, self.rgb[1] + 20, self.rgb[2] + 20]
	});

	game.entities.push(copyEntity);
};

module.exports = Entity;