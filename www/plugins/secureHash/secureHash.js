/* SHA 224 & SHA 256 Hashing Plugin
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

	secureHash = {

		initAtLoad : false,
		_libIncludes : "plugins/secureHash/lib/SHA256.js",

		init : function(root) {
			pluginUtil.loadScript(secureHash._libIncludes);
			secureHashLibInit(root);
		},

	};

	if (secureHash.initAtLoad) {
		secureHash.init(this);
	}

})();