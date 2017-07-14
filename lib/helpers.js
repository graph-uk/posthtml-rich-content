/**
 * Append or prepend a new class name to the node
 * @param {Object} node
 * @param {String} className
 * @param {Boolean} [prepend]
 * @return {Object}
 */
exports.addClass = function addClass(node, className, prepend) {
	const classes = !(node.attrs && node.attrs.class) ? [] : node.attrs.class.split(' ');

	if (prepend) {
		classes.unshift(className);
	} else {
		classes.push(className);
	}

	node.attrs = Object.assign(node.attrs || {attrs: {}}, {
		class: classes.join(' ')
	});

	return node;
};

/**
 * Check if the node has the class name
 * @param {Object} node
 * @param {String} className
 * @return {Boolean}
 */
exports.hasClass = function hasClass(node, className) {
	const classes = (node.attrs && node.attrs.class) ? node.attrs.class.split(' ') : [];

	return classes.indexOf(className) >= 0;
};

/**
 * Get the number of tags
 * @param {Array} content
 * @param {String} tag
 * @return {Number}
 */
exports.coutTags = function countTags(content, tag) {
	return content
		.filter(function (item) {
			return item.tag === tag;
		})
		.length;
};
