var addClass = require('./helpers/addClass');
var hasClass = require('./helpers/hasClass');

/**
 * Wrap <iframe> with <div> to make to proportional
 * @param {Function} b is an instance of "bem-cn-lite" generator
 * @return {Function}
 */
module.exports = function (b) {
	var classVideo = b('video');
	var classIframe = b('video-iframe');

	/**
	 * Traverse the tree
	 * @param {Array} tree
	 * @return {Array}
	 */
	return function (tree) {
		tree.walk(function (node) {
			if (node.tag === 'iframe' && !hasClass(node, classIframe)) {
				addClass(node, classIframe);

				return {
					tag: 'div',
					attrs: {
						class: classVideo
					},
					content: [node]
				};
			}
			return node;
		});

		return tree;
	};
};
