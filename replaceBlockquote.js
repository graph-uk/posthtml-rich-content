var addClass = require('./helpers/addClass');
var countTags = require('./helpers/countTags');

function blockquoteBlock(blockquote, description, classNames) {
	addClass(blockquote, classNames.blockquote);

	return {
		tag: 'figure',
		attrs: {
			class: classNames.block
		},
		content: [
			blockquote,
			{
				tag: 'figcaption',
				attrs: {
					class: classNames.caption
				},
				content: description
			}
		]
	};
}

function getBlockquoteNode(node) {
	if (node.content.length > 1) {
		return false;
	}

	var tag = node.content[0].tag;

	if (tag === 'blockquote') {
		return node.content[0];
	}

	if (tag === 'em') {
		if (node.content[0].content[0].tag === 'img') {
			return node.content[0].content[0];
		}
	}

	return false;
}

function getDescriptionNode(node) {
	if (node.content.length > 1) {
		return false;
	}

	if (node.content[0].tag === 'em') {
		if (countTags(node.content[0].content, 'img') > 0) {
			return false;
		}
		return node.content[0].content;
	}

	return false;
}

function replaceBlockquote(tree, classNames) {
	return tree.map(function(node, i, sibling) {
		var next = sibling[i + 1];

		if (next) {
			if (node.tag === 'p' && next.tag === 'p') {
				var blockquote = getBlockquoteNode(node);
				var description = getDescriptionNode(next);

				if (blockquote && description) {
					sibling[i + 1] = [];
					node = blockquoteBlock(blockquote, description, classNames);
				}
			}
		}

		if (Array.isArray(node.content)) {
			node.content = replaceBlockquote(node.content, classNames);
		}

		return node;
	});
}

/**
 * Convert <p><blockquote></p><p><em>Blockquote caption</em></p> into <figure>
 * @param {Function} b is an instance of "bem-cn-lite" generator
 * @return {Function}
 */
module.exports = function (b) {
	var classNames = {
		block: b('figure-blockquote'),
		blockquote: b('figure-blockquote-text'),
		caption: b('figure-blockquote-caption')
	};

	/**
	 * Traverse the tree
	 * @param {Array} tree
	 * @return {Array}
	 */
	return function (tree) {
		return replaceBlockquote(tree, classNames);
	};
};
