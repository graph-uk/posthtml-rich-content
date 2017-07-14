/**
 * Check if the node has the class name
 * @param {Object} node
 * @param {String} className
 * @return {Boolean}
 */
module.exports = function hasClass(node, className) {
	var classes = (node.attrs && node.attrs.class) ? node.attrs.class.split(' ') : [];

	return classes.indexOf(className) >= 0;
};
