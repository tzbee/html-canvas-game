module.exports = EntityPool;

function EntityPool(Constructor, initSize) {
	this.Constructor = Constructor;

	this._objects = [];

	for (var i = 0; i < initSize; i++) {
		this._objects.push(new Constructor());
	}

	this.get = function() {
		var length = this._objects.length;

		if (length >= 0) {
			return this._objects.pop();
		} else {
			return new Constructor();
		}
	};

	this.add = function(entity) {
		return this._objects.push(entity);
	};
}