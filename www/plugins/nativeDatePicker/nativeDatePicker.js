/* Native Date Picker Plugin
 * 
 * @Contributors
 * Yogesh Krishnani
 * Parth Hirpara
 * Alfaz Jikani 
 *
 * @Version
 * 1.1
 *
 */

nativeDatePicker = (function() {
	'use strict';

	var _libIncludesAndroid = "plugins/nativeDatePicker/android/DatePicker.js";
	var _libIncludesIOS = "plugins/nativeDatePicker/ios/DatePicker.js";
	var _libIncludesWINDOWS = "plugins/nativeDatePicker/windows/DatePicker.js";
	var initAtLoad = false;
	var _supported = true;
	var platforms = {
		ANDROID : 0,
		IOS : 1,
		WINDOWS : 2
	};

	var init = function(platform) {

		if (typeof cordova != "undefined") {
			console.log("date picker init called : Platform -->" + platform);

			if (platform == platforms.ANDROID) {
				pluginUtil.loadScript(_libIncludesAndroid);
			} else if (platform == platforms.IOS) {
				pluginUtil.loadScript(_libIncludesIOS);
			} else if (platform == platforms.WINDOWS) {
				pluginUtil.loadScript(_libIncludesWINDOWS);
			} else {
				// Platform other than Android, iOS or Windows
				console.log("Platform other than Android, iOS or Windows");
				_supported = false;
			}

		} else {
			console.log("Date Picker Is Not Supported In Current Environment...!");
			_supported = false;
		}

	};
	
	var isSupported = function() {
		return _supported || false;
	};

	var showDatePicker = function(options, callbackSuccess, callbackFailure) {

		if (!_supported)
			return;

		function onSuccess(date) {
			console.log('Date Picker ---> Selected date: ' + date);

			if (typeof callbackSuccess == "function") {
				callbackSuccess(date);
			}
		}

		function onError(error) {
			console.log('Date Picker ---> Error: ' + error);

			if (typeof callbackFailure == "function") {
				callbackFailure(error);
			}
		}

		window.plugins.datePicker.show(options, onSuccess, onError);
	};

	if (initAtLoad) {
		console.log("date picker initAtLoad called");

		var platform = platforms.ANDROID; // Set your platform here ---> Android is default
		init(platform);
	}
	
	return {
		initAtLoad : initAtLoad,
		platforms : platforms,
		init : init,
		isSupported : isSupported,
		showDatePicker : showDatePicker
	};

})();