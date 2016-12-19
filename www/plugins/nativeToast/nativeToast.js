/* Native Toast Plugin
 * 
 * @Contributors
 * Parth Hirpara
 * Yogesh Krishnani
 *
 * @Version
 * 1.0
 *
 */
(function() {
	nativeToast = {
		_libIncludes : "plugins/nativeToast/lib/toast.js",
		_supported : false,
		_initAtLoad : true,
		_options : {
		  	duration : 2000, //In ms
		  	position : "bottom",
		  	addPixelsY : -100
		  	/*styling: {
		        opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
		        backgroundColor: '#FF0000', // make sure you use #RRGGBB. Default #333333
		        textColor: '#FFFF00', // Ditto. Default #FFFFFF
		        textSize: 20.5, // Default is approx. 13.
		        cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
		        horizontalPadding: 20, // iOS default 16, Android default 50
		        verticalPadding: 16 // iOS default 12, Android default 30
		      }*/
		},
		init : function() {

			if (typeof cordova != "undefined") {
				try {
					pluginUtil.loadScript(nativeToast._libIncludes);
					nativeToast._supported = true;
				} catch (e) {
					console.error(e);
				}
			} else {
				console.log("Native Toast Is Not Supported In Current Environment...!");
			}
		},
		isSupported : function(){
			return nativeToast._supported;
		},
		showToast : function(message, customOptions, callbackSuccess, callbackFailure) {
			
			if (!nativeToast._supported)
				return;

			var options = $.extend(true, nativeToast._options, customOptions);
			options.message = message;
			
			function onSuccess(date) {
				if (typeof callbackSuccess == "function") {
					callbackSuccess();
				}
			}

			function onError(error) {
				if (typeof callbackFailure == "function") {
					callbackFailure(error);
				}
			}
			window.plugins.toast.showWithOptions(options, onSuccess, onError);
		}
	};

	if (nativeToast._initAtLoad) {
		nativeToast.init();
	}
})();