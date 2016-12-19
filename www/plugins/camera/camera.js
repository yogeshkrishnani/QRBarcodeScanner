/* Camera Plugin
 * 
 * @Contributors
 * Yogesh Krishnani
 * Parth Hirpara 
 * Alfaz Jikani
 *
 * @Version
 * 1.2
 *
 */

var _thresholdInKb=config.maxImageFileSize;
var _thresholdSize=1024*_thresholdInKb;
var _qualityCoefficient_ANDROID=95;
var _qualityCoefficient_IOS=15;
var _targetWidth = 720;
var _targetHeight = 720;
var _targetWidthIOS = 640;
var _targetHeightIOS = 640;
var _cameraFlag = {
	SUCCESS : 1,	
	UNSUPPORTED_DEVICE : -1,
	EXCEEDS_MAX_FILE_SIZE : -2
};
var _defaultCameraJSON={};

var camera = {
	 init : function() {

		if (typeof cordova == "undefined" || !navigator.camera) {
			console.warn ("camera init failed");
			return;
		}

		_defaultCameraJSON = {
			quality : ionic.Platform.isIOS() ? _qualityCoefficient_IOS : _qualityCoefficient_ANDROID,
			saveToPhotoAlbum : false,
			destinationType : navigator.camera.DestinationType.FILE_URI,
			encodingType : Camera.EncodingType.JPEG,
			targetWidth: _targetWidth,
			targetHeight: _targetHeight,
			correctOrientation : true,
			allowEdit : true,
			renameFile : false
		};

		console.log("platform isIOS: " + ionic.Platform.isIOS());

		if (ionic.Platform.isIOS()) {
			if (_targetWidthIOS != undefined && _targetWidthIOS != null) {
				_defaultCameraJSON.targetWidth = _targetWidthIOS;
			}
			if (_targetHeightIOS != undefined && _targetHeightIOS != null) {
				_defaultCameraJSON.targetHeight = _targetHeightIOS;
			}
		}
	},

	onCameraFail : function(message){
		WL.Logger.info("Camera failed: " + message);
	},
	
	renameFile : function(src, callback) {
	    //find the FileEntry for the file on the device
	    window.resolveLocalFileSystemURL(src, function(fileEntry) {
	        //get the parent directory (callback gives a DirectoryEntry)
	        fileEntry.getParent(function(parent) {
	            //rename the file, prepending a timestamp.
	            fileEntry.moveTo(parent, Date.now() + "_" + fileEntry.name, function(s) {
	                //Callback with the new URL of the file.
	            	callback(s.nativeURL);
	            }, function(error) {
	                console.warn('Error on moving file!');
	                callback(src); //Fallback, use the src given
	            });
	        }, function(error) {
	        	console.warn('Error on getting parent!');
	            callback(src); //Fallback
	        });
	    }, function(error) {
	    	console.warn('Error on resolveLocalFileSystemURI!');
	        callback(src); //Fallback
	    });
	},

	getImage : function(sourceType, callback, options) {
		
		var response = {};
		
		if (navigator.camera == undefined || typeof navigator.camera == 'undefined') {
			response.flag = _cameraFlag.UNSUPPORTED_DEVICE;
			callback(response);
			return;
		}
			
		if(sourceType == "camera"){
			_defaultCameraJSON.sourceType = navigator.camera.PictureSourceType.CAMERA;
		}else if(sourceType == "gallery"){
			_defaultCameraJSON.sourceType = navigator.camera.PictureSourceType.PHOTOLIBRARY;
		}else{
			// default source type
		}
		
		var _cameraJSON = $.extend(true, _defaultCameraJSON, options || {});
		
		console.log("_cameraJSON", _cameraJSON);
		
		navigator.camera.getPicture(function (uri) {
			
			console.log("oldfileUri", uri);
			
			if(_cameraJSON.renameFile) {
				camera.renameFile(uri, function(newURI) {
					console.log("newURI", newURI);
					camera.getImageFile(newURI, callback);
				});
			}
			else {
				camera.getImageFile(uri, callback);
			}
			
		}, camera.onCameraFail, _cameraJSON);
	},
	
	getImageFile : function(fileURI, callback) {
		window.resolveLocalFileSystemURL(fileURI, function(fileEntry) { 
		    fileEntry.file(function(fileObj) {
		
				console.log("fileObj", fileObj);
				
				var fileType = "jpg";
				
				var response = {
					fileName : fileObj.name,
					fileType : fileType,
					fileURI : fileURI
				};
				
				if(fileObj.size > _thresholdSize ) {
					response.imageData = null;
					response.flag = _cameraFlag.EXCEEDS_MAX_FILE_SIZE;
					callback(response);
				} 
				else {
					var reader = new FileReader();
					reader.onloadend = function(evt) {
						console.log("Read complete!");
						response.imageData = evt.target.result;
						response.flag = _cameraFlag.SUCCESS;
						callback(response);
					};
					reader.readAsDataURL(fileObj);
				}
		    }); 
		});
	}
};
