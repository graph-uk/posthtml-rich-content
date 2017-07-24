const countTags = require('posthtml-rich-content/helpers/countTags');

function elementBlock(element, description, classNames) {
	return {
		tag: 'figure',
		attrs: {
			class: classNames.block
		},
		content: [
			element,
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

function getElementNode(node, element) {
	if (node.content.length > 1) {
		return false;
	}

	const tag = node.content[0].tag;

	if (tag === element) {
		return node.content[0];
	}

	if (tag === 'em') {
		if (node.content[0].content[0].tag === element) {
			return node.content[0].content[0];
		}
	}

	return false;
}

function getDescriptionNode(node, element) {
	if (node.content.length > 1) {
		return false;
	}

	if (node.content[0].tag === 'em') {
		if (countTags(node.content[0].content, element) > 0) {
			return false;
		}
		return node.content[0].content;
	}

	return false;
}

function replaceElement(tree, classNames, tag) {
	return tree.map(function(node, i, sibling) {
		const next = sibling[i + 1];

		if (next) {
			if (node.tag === 'p' && next.tag === 'p') {
				const element = getElementNode(node, tag);
				const description = getDescriptionNode(next, tag);

				if (element && description) {
					sibling[i + 1] = [];
					node = elementBlock(element, description, classNames);
				}
			}
		}

		if (Array.isArray(node.content)) {
			node.content = replaceElement(node.content, classNames, tag);
		}

		return node;
	});
}

/**
 * Convert <p><element></p><p><em>Element caption</em></p> into <figure>
 * @param {Function} b is an instance of "bem-cn-lite" generator; tag is an element tag ex. 'img', 'blockquote'
 * @return {Function}
 */
module.exports = function (b, tag) {
	const modifiers = {
		img: 'picture',
		blockquote: 'quote'
	};
	const elementModifier = tag in modifiers ? modifiers[tag] : tag;
	const classNames = {
		block: b('figure', {type: elementModifier}),
		caption: b('figure-caption', {type: elementModifier})
	};

	/**
	 * Traverse the tree
	 * @param {Array} tree
	 * @return {Array}
	 */
	return function (tree) {
		return replaceElement(tree, classNames, tag);
	};
};
