/**
 * Get the number of tags
 * @param {Array} content
 * @param {String} tag
 * @return {Number}
 */
module.exports = function countTags(content, tag) {
	return content
		.filter(function (item) {
			return item.tag === tag;
		})
		.length;
};
