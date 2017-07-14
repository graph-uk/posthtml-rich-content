var posthtml = require('posthtml');

module.exports = function (plugins) {
	return function (html) {
		return posthtml(plugins)
			.process(html, {sync: true})
			.html;
	};
};
