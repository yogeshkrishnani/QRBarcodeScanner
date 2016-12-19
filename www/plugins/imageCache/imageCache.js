/* Image Cache Plugin
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

	imageCache = {

		initAtLoad : false,
		_libIncludes : "plugins/imageCache/lib/imgcache.js",

		init : function() {
			pluginUtil.loadScript(imageCache._libIncludes);
			
			// write log to console
			ImgCache.options.debug = false;

			// increase allocated space on Chrome to 50MB, default was 10MB
			ImgCache.options.chromeQuota = 50*1024*1024;
			ImgCache.options.cacheClearSize = 20;
			
			ImgCache.init(function () {
			    console.log('ImgCache init: success!');

			    // from within this function you're now able to call other ImgCache methods
			    // or you can wait for the ImgCacheReady event

			}, function () {
			    console.error('ImgCache init: error! Check the log for errors');
			});
		},

	};

	if (imageCache.initAtLoad) {
		imageCache.init();
	}

})();