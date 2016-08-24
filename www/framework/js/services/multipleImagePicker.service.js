angular.module(config.appServices).factory('MultipleImagePickerDelegate', function () {
	
	var MultipleImagePickerDelegate = {};
	var defaultOptions = {
		renameFile : true,
		targetHeight : 1024,
		targetWidth : 1024
	};
	var options = undefined;
	var capturedImages = new Array();
	
	MultipleImagePickerDelegate.getOptions = function() {
		return options || defaultOptions;
	};
	
	MultipleImagePickerDelegate.setOptions = function(customOptions) {
		options = $.extend(true, defaultOptions, customOptions);
	};
	
	MultipleImagePickerDelegate.getCapturedImages = function() {
		return capturedImages;
	};

	MultipleImagePickerDelegate.setCapturedImages = function(_capturedImages) {
		capturedImages = _capturedImages;
	};
	
	return MultipleImagePickerDelegate;
});