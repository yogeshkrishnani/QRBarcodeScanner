/* Jquery rating Plugin
 * 
 * @Contributors
 * Yogesh Krishnani
 * Parth Hirpara 
 *
 * @Version
 * 1.0
 *
 */

(function() {

	jqRating = {

		initAtLoad : true,
		_libIncludes : "plugins/jqRating/lib/rating.js",

		init : function() {
			$("head").append('<link href="plugins/jqRating/lib/rating.css" rel="stylesheet">');
			pluginUtil.loadScript(jqRating._libIncludes);
		},

	};

	if (jqRating.initAtLoad) {
		jqRating.init();
	}

})();