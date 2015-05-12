var c = require('./entities/character');
var hero = require('./entities/hero');
var resources = require('./resources');
var Wave = require('./wave');

module.exports = Game;

function Game(ctx) {
	this.entities = [];

	var self = this;

	var requestAnimFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	var lastTime;

	function main() {
		var now = Date.now();
		var dt = lastTime ? (now - lastTime) / 1000.0 : 0;

		update(dt);
		render();

		lastTime = now;
		requestAnimFrame(main);
	}

	var grassPattern;

	function init(done) {
		resources.load(['img/rpg.png', 'img/bullet2.png', 'img/grass.jpg'], function() {

			//Create main entities
			var jon = hero.create(self, [200, 400], 'right');
			var rob = hero.create(self, [600, 200], 'left');

			// Add entities to the game
			self.entities.push(jon);
			self.entities.push(rob);

			jon.moveTo(rob.pos);

			// Load background pattern
			grassPattern = ctx.createPattern(resources.get('img/grass.jpg'), "repeat");

			done();
		});
	}

	function render() {
		var entities = self.entities;

		var sizeWidth = ctx.canvas.clientWidth;
		var sizeHeight = ctx.canvas.clientHeight;

		// Clear background
		ctx.fillStyle = grassPattern;
		ctx.fillRect(0, 0, sizeWidth, sizeHeight);

		// Render entities
		for (var i = 0; i < entities.length; i++) {
			entities[i].render(ctx);
		}
	}

	function update(dt) {
		checkCollisions();

		var entities = self.entities;
		var entity;

		// Update entities
		for (var i = 0; i < entities.length; i++) {
			entity = entities[i];
			entity.update(dt);
		}

		// Remove inactive entities
		for (i = 0; i < entities.length; i++) {
			entity = entities[i];
			if (!entity.active) {
				entities.splice(i, 1);
				i--;
			}
		}
	}

	// Collisions
	function collides(x, y, r, b, x2, y2, r2, b2) {
		return !(r <= x2 || x > r2 ||
			b <= y2 || y > b2);
	}

	function boxCollides(pos, size, pos2, size2) {
		return collides(pos[0], pos[1],
			pos[0] + size[0], pos[1] + size[1],
			pos2[0], pos2[1],
			pos2[0] + size2[0], pos2[1] + size2[1]);
	}

	function checkCollisions() {
		var entities = self.entities;

		for (var i = 0; i < entities.length; i++) {
			var entity = entities[i];

			for (var j = 0; j < entities.length; j++) {
				if (i === j) break;

				var entityToCheck = entities[j];

				if (boxCollides(entity.pos, entity.size, entityToCheck.pos, entityToCheck.size)) {
					entity.collides(entityToCheck);
				}
			}
		}
	}

	this.start = function() {
		init(main);
	};
}