/* FileUtils Factory - 
 * 
 * @Features
 * Upload File 
 * Upload Multiple Files
 * getFileDownloadURL
 * 
 * @Contributors
 * Yogesh Krishnani
 * Parth Hirpara
 *
 * @Version
 * 1.0
 *
 */

(function () {
	'use strict';
	
	angular
	.module(config.appServices)
	.factory('FileUtils', ['$q', function ($q) {
	
		var FileUtils = {};

		FileUtils.fileUploadServletURI = config.fileUploadServlet; //Change To Your Destination Upload File Server URI
		FileUtils.fileDownloadServletURI = config.fileDownloadServlet; //Change To Your Destination Download File Server URI
		
		FileUtils.uploadFile = function (fileURI, fileName, destServerURI) {
			
			console.log("In uploadFile of FileUtils");
			console.log("fileURI : " + fileURI);
			console.log("fileName : " + fileName);
			
			if(angular.isUndefined(fileName)) {
				fileName = fileURI.substr( fileURI.lastIndexOf("/") + 1 );
			}
			
			//var fileExtension = fileName.substr( fileName.lastIndexOf(".") + 1 );
			
			if(angular.isUndefined(destServerURI) || !angular.isString(destServerURI)) {
				destServerURI = FileUtils.fileUploadServletURI;
			}
			
			var q = $q.defer();	
			
			try {
				
				var uri = encodeURI(destServerURI);
				
				console.log("destServerURI : " + destServerURI);
				
				var options = new FileUploadOptions();
				options.fileKey="file";
				options.fileName=fileName;
				
				var ft = new FileTransfer();
				
				function win(r) {
					console.log("File Upload Success --> " + JSON.stringify(r));
					q.resolve(r.response);
				}
					
				function fail(e) {
					console.log("File Upload Failure --> " + JSON.stringify(e));
					q.reject(e);
				}
				
				console.log("Uploading File");
				
				ft.upload(fileURI, uri, win, fail, options);
				
			}
			catch(e) {
				console.log("File Upload Failure --> " + e.toString());
				q.reject(e);
			}
			
			return q.promise;				
		};
		
		FileUtils.uploadMultipleFiles = function(files) {
			/* [ { fileName : "", fileURI : "" } ] */
			var q = $q.defer();		
			var defs = new Array();
			
			for(var index = 0; index < files.length; index++ ) {
				var fileURI = files[index]['fileURI'];
				var fileName = files[index]['fileName'];
				defs.push( FileUtils.uploadFile(fileURI, fileName) );
			}
			
			$q.all(defs).then(
			function(response) {
				q.resolve(response);
			},
			function(response) {
				q.reject(response);
			});
			
			return q.promise;
		};
		
		FileUtils.getFileDownloadURL = function(fileName) {
			return  FileUtils.fileDownloadServletURI + "?fileName=" + fileName + "";	
		};
		
		return FileUtils;
		
	}]);	

})();

