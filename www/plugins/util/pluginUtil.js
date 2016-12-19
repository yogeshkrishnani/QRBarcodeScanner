/* Plugin Util
 * 
 * @Contributors
 * Yogesh Krishnani
 * Parth Hirpara
 *
 * @Version
 * 1.1
 *
 */
(function() {
	pluginUtil = {

		scriptLoadMethod : -1,
		scriptLoadMethods : {
			vanillaJS : 0,
			Jquery : 1
		},
		initAtLoad : true,

		updateJSLoadPreference : function(scriptLoadMethod) {
			pluginUtil.scriptLoadMethod = scriptLoadMethod;
		},
		loadScript : function(src) {
			if (pluginUtil.scriptLoadMethod == pluginUtil.scriptLoadMethods.vanillaJS) {
				
				var s = document.createElement('script');
			    s.src = src;
			    s.type = "text/javascript";
			    s.async = false;                                 // <-- this is important
			    document.getElementsByTagName('head')[0].appendChild(s);
			    
			} else {
				/***** Commented To PASS SLP PEN TEST ************/
				$("body").append("<script type='text/javascript' src=" + src + "/>")
			}
		}

	};

	if (pluginUtil.initAtLoad) {
		console.log("pluginUtil initAtLoad called");

		var platform = pluginUtil.scriptLoadMethods.Jquery; // Set your platform here ---> Android is default
		pluginUtil.updateJSLoadPreference(platform);
	}

})();