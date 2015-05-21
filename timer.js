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

module.exports = Timer;