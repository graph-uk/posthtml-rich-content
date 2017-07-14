const addClass = require('./helpers').addClass;
const hasClass = require('./helpers').hasClass;

/**
 * Wrap <blockquot> with some divs
 * @param {Function} b is an instance of "bem-cn-lite" generator
 * @return {Function}
 */
module.exports = function (b) {
	const classQuote = b('quote');
	const classQuoteContent = b('quote-content');
	const classQuoteText = b('quote-text');

	/**
	 * Traverse the tree
	 * @param {Array} tree
	 * @return {Array}
	 */
	return function (tree) {
		tree.walk(function (node) {
			if (node.tag === 'blockquot' && !hasClass(node, classQuoteText)) {
				addClass(node, classQuoteText);

				return {
					tag: 'div',
					attrs: {
						class: classQuote
					},
					content: {
						tag: 'div',
						attrs: {
							class: classQuoteContent
						},
						content: [node]
					}
				};
			}
			return node;
		});

		return tree;
	};
};
