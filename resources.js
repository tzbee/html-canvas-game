var cache = {};

module.exports.load = function(urls, done) {
	urls = typeof urls === 'string' ? [urls] : urls;
	var urlLoadedCounter = 0;

	urls.forEach(function(url) {
		var img = new Image();
		img.src = url;
		img.onload = function() {
			cache[url] = img;
			if (++urlLoadedCounter >= urls.length) {
				done();
				return;
			}
		};
	});
};

module.exports.get = function(url) {
	return cache[url];
};