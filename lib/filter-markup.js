const addClass = require('./helpers').addClass;

/**
 * Add "markup" class to each tag
 * @param {Function} b is an instance of "bem-cn-lite" generator
 * @return {Function}
 */
module.exports = function (b) {
	const baseBlock = b();

	/**
	 * Traverse the tree
	 * @param {Array} tree
	 * @return {Array}
	 */
	return function (tree) {
		tree.walk(function (node) {
			if (node.tag) {
				const className = 'markup-' + node.tag;

				if (baseBlock) {
					addClass(node, baseBlock + '__' + className, true);
				}

				addClass(node, className, true);
			}

			return node;
		});

		return tree;
	};
};
