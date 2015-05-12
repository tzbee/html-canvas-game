var resources = require('./resources');

function Frame(img, sPos, sSize) {
	this.img = img;
	this.sPos = sPos;
	this.sSize = sSize;

	var sx = this.sPos[0],
		sy = this.sPos[1],
		swidth = this.sSize[0],
		sheight = this.sSize[1];

	this.render = function(ctx, x, y) {
		ctx.drawImage(this.img, sx, sy, swidth, sheight, x, y, swidth, sheight);
	};
}

function Timer(tick, cb) {
	this._t = 0;

	this.update = function(dt) {
		this._t += dt;

		if (this._t >= tick) {
			cb();
			this.reset();
		}
	};

	this.reset = function() {
		this._t = 0;
	};
}

function createFrames(img, frameDescs) {
	return frameDescs.map(function(frameDesc) {
		var sPos = frameDesc[0];
		var sSize = frameDesc[1];
		return new Frame(img, sPos, sSize);
	});
}

function Sprite(imgURL, frameDescs, speed, once) {
	this.img = resources.get(imgURL);
	this.frames = createFrames(this.img, frameDescs);
	this.speed = speed || 1;
	this.once = once || false;
	this.done = false;

	this._frameIndex = 0;
	this._timer = new Timer(1 / speed, function() {
		if (this._frameIndex >= this.frames.length - 1) {
			if (this.once) {
				this.done = true;
				return;
			} else {
				this._frameIndex = 0;
			}
		} else {
			this._frameIndex++;
		}
	}.bind(this));

	this.render = function(ctx) {
		this.frames[this._frameIndex].render(ctx, 100, 100);
	};

	this.update = function(dt) {
		this._timer.update(dt);
	};
}

module.exports = Sprite;