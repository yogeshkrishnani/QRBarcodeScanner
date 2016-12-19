/* Google Plus Authentication Plugin
 * 
 * @Contributors
 * Yogesh Krishnani
 *
 * @Version
 * 1.0
 *
 */

(function() {

	window.googlePluAuth = {

		_libIncludes : '<script src="plugins/googlePlusAuth/lib/GooglePlus.js"></script>"',
		initAtLoad : true,
		_supported : false,

		init : function() {
			if (typeof cordova != "undefined") {
				$("body").append(googlePluAuth._libIncludes);
				googlePluAuth._supported = true;
			} else {
				console.log("Google Plus Authentciation Is Not Supported In Current Environment...!");
			}
		},

		isAvailable : function(callback) {
			if (typeof cordova != "undefined") {
				window.plugins.googleplus.isAvailable(function(available) {
	
					console.log("Google Plus Auth " + (available == "true" ? "Available" : "Not Available"));
					
					googlePluAuth.available = available;
					if (typeof callback == "function")
						callback(available);
				});
			}
		},
		
		login : function(successCallback, errorCallback, options) {
			
			if(!googlePluAuth._supported) {
				console.log("Google Plus Authentciation Is Not Supported In Current Environment...!");
				errorCallback(-1);
				return;
			} 
			
			options = options || {};
			
			window.plugins.googleplus.login(options, successCallback, errorCallback);
		},
		
		logout : function(successCallback, errorCallback) {
			
			if(!googlePluAuth._supported) {
				console.log("Google Plus Authentciation Is Not Supported In Current Environment...!");
				errorCallback(-1);
				return;
			} 
			
			window.plugins.googleplus.logout(successCallback, errorCallback);
		}
	};

	if (googlePluAuth.initAtLoad) {
		console.log("invoking googlePlusAuth Init...");
		googlePluAuth.init();
	}

})();