function Entity(options) {
	options = options || {};

	this.game = options.game;

	this.active = true;
	this.range = options.range || 80;

	this.sideIndex = options.sideIndex || 0;

	this.timers = options.timers ? options.timers.map(function(timer) {
		timer.cb.bind(this);
		return timer;
	}.bind(this)) : [];

	this.pos = options.pos || [10, 10];
	this.size = options.size || [0, 0];
	this.speed = options.speed || 40;
	this.isMoving = options.isMoving || false;
	this.destination = this.pos.slice();
	this.distanceLeft = options.distanceLeft || 0;
	this.direction = options.direction || 'down';
	this.sprite = options.sprite;
}

Entity.prototype.render = function(ctx) {
	ctx.save();
	ctx.translate(this.pos[0], this.pos[1]);
	this.sprite.render(ctx);

	ctx.restore();
};

Entity.prototype.update = function(dt) {

	// Update timers
	for (var i = 0; i < this.timers.length; i++) {
		this.timers[i].update(dt);
	}

	// If the entity is moving
	if (this.isMoving) {

		// Update position
		this.move(this.direction, dt);
	}
};

Entity.prototype.move = function(direction, dt) {
	var posIndex, modifier;

	if (direction === 'left') {
		posIndex = 0;
		modifier = -1;
	} else if (direction === 'right') {
		posIndex = 0;
		modifier = 1;
	} else if (direction === 'up') {
		posIndex = 1;
		modifier = -1;
	} else if (direction === 'down') {
		posIndex = 1;
		modifier = 1;
	} else {
		return;
	}

	var distance = this.speed * dt;
	this.pos[posIndex] += modifier * distance;
	this.direction = direction;
	this.distanceLeft -= distance;

	if (this.distanceLeft <= 0) {
		this.isMoving = false;
		this.distanceLeft = 0;
	}
};

Entity.prototype.moveDistance = function(distance, direction) {
	this.isMoving = true;
	this.direction = direction;
	this.distanceLeft = distance;
};

//Move to the designated position
Entity.prototype.moveTo = function(pos) {
	//TODO

	this.destination = pos;
	
	var thisPos = this.pos;

	var diffPos = [pos[0] - thisPos[0], pos[1] - thisPos[1]];

	if (diffPos[0] > 0) {
		this.isMoving = true;
		this.direction = 'left';
		this.distanceLeft = Math.abs(diffPos[0]);
	} else if (diffPos[0] < 0) {
		this.isMoving = true;
		this.direction = 'right';
		this.distanceLeft = Math.abs(diffPos[0]);
	} 

	if (diffPos[1] > 0) {
		this.isMoving = true;
		this.direction = 'down';
		this.distanceLeft = Math.abs(diffPos[1]);
	} else if (diffPos[1] < 0) {
		this.isMoving = true;
		this.direction = 'up';
		this.distanceLeft = Math.abs(diffPos[1]);
	}
};

function Timer(tick, cb) {
	this.cb = cb;
	this._t = 0;

	this.update = function(dt) {
		this._t += dt;

		if (this._t >= tick) {
			this.cb(dt);
			this.reset();
		}
	};

	this.reset = function() {
		this._t = 0;
	};
}

Entity.prototype.collides = function(entity) {
	if (this.sideIndex !== entity.sideIndex) {
		this.active = false;
		entity.active = false;
	}
};

module.exports = Entity;
module.exports.Timer = Timer;