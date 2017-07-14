var addClass = require('./helpers/addClass');
var countTags = require('./helpers/countTags');

function imageBlock(image, description, classNames) {
	addClass(image, classNames.image);

	return {
		tag: 'div',
		attrs: {
			class: classNames.block
		},
		content: {
			tag: 'figure',
			attrs: {
				class: classNames.content
			},
			content: [
				image,
				{
					tag: 'figcation',
					attrs: {
						class: classNames.caption
					},
					content: description
				}
			]
		}
	};
}

function getImageNode(node) {
	if (node.content.length > 1) {
		return false;
	}

	var tag = node.content[0].tag;

	if (tag === 'img') {
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

function replaceImage(tree, classNames) {
	return tree.map(function (node, i, sibling) {
		var next = sibling[i + 1];

		if (next) {
			if (node.tag === 'p' && next.tag === 'p') {
				var image = getImageNode(node);
				var description = getDescriptionNode(next);

				if (image && description) {
					sibling[i + 1] = [];
					node = imageBlock(image, description, classNames);
				}
			}
		}

		if (Array.isArray(node.content)) {
			node.content = replaceImage(node.content, classNames);
		}

		return node;
	});
}

/**
 * Convert <p><img></p><p><em>Image caption</em></p> into <figure>
 * @param {Function} b is an instance of "bem-cn-lite" generator
 * @return {Function}
 */
module.exports = function (b) {
	var classNames = {
		block: b('figure'),
		image: b('figure-image'),
		content: b('figure-content'),
		caption: b('figure-caption')
	};

	/**
	 * Traverse the tree
	 * @param {Array} tree
	 * @return {Array}
	 */
	return function (tree) {
		return replaceImage(tree, classNames);
	};
};
