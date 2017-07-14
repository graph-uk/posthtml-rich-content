/**
 * Append or prepend a new class name to the node
 * @param {Object} node
 * @param {String} className
 * @param {Boolean} [prepend]
 * @return {Object}
 */
module.exports = function addClass(node, className, prepend) {
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
