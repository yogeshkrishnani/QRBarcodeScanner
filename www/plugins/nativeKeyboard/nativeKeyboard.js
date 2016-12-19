/* Ionic Native Keyboard Plugin
 * 
 * @Contributors
 * Yogesh Krishnani
 * Parth Hirpara
 *
 * @Version
 * 1.1
 *
 */

(function(){
	nativeKeyboard = {
		_libIncludesAndroid : "plugins/nativeKeyboard/lib/android/keyboard.js",
		_libIncludesIOS : "plugins/nativeKeyboard/lib/ios/keyboard.js", 
		initAtLoad : false,
		_supported : false,
		platforms : {
			ANDROID : 0,
			IOS : 1
		},

		init : function(platform) {
			
			var Q = $.Deferred();

			if (typeof cordova != "undefined") {
				console.log("nativeKeyboard init : Platform -->" + platform);

				try {
					if (platform == nativeKeyboard.platforms.ANDROID) {
						pluginUtil.loadScript(nativeKeyboard._libIncludesAndroid);
						nativeKeyboard._supported = true;
					} else if (platform == nativeKeyboard.platforms.IOS) {
						pluginUtil.loadScript(nativeKeyboard._libIncludesIOS);
						nativeKeyboard._supported = true;
					}  else {
						// Platform other than Android, iOS or Windows
						console.log("Platform other than Android or IOS");
					}
				}
				catch(e) {
					console.error(e);
				}
				
				if(nativeKeyboard._supported) {
					Q.resolve(0);
				}
				else {
					Q.reject(-1);
				}
				
				
			} else {
				console.log("Native Keyboard Is Not Supported In Current Environment...!");
				Q.reject(-1);
			}
			
			return Q;

		},

	};
	
	if(nativeKeyboard.initAtLoad){
		console.log("nativeKeyboard initAtLoad called");
		
		var platform = nativeKeyboard.platforms.ANDROID; // Set your platform here ---> Android is default
		nativeKeyboard.init(platform);
	}
	
})();