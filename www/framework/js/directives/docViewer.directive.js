angular.module(config.appDirectives).directive('docViewer',[function() {
	return {
		template: function(element, attrs) {
			var htmlText = '<ion-scroll class="ionImgViewer" zooming="false" direction="x" style="width: 100%;">' + 
				'<ul>' + 
					'<li class="imageContainer" ng-repeat="docData in '+ attrs['ngData'] + ' track by $index" ng-click="viewDoc('+attrs['ngData']+'[$index])"><div class="imageBox" style="font-size: 12px;color: #fff;padding: 5px;">{{docData.name}}</div></li>' +
					'<div class="clear"></div>' + 
				'</ul></ion-scroll>';
			
			return htmlText;
		},
		controller: function($scope) {
			$scope.viewDoc = function(docData, index) {
				var fileType = docData.name.substring( docData.name.lastIndexOf('.')+1);
				//If Android/IOS download the file to device and then show in native Document Viewer
				if(ionic.Platform.isAndroid() || ionic.Platform.isIOS()){
					WL.Logger.info("In viewImages function");
					viewFiles.download(docData.url,function(filePath){
						viewFiles.viewDocument(filePath, fileType);
					});
				}else if(ionic.Platform.is('browser')){ //If browser show in new window
					viewFiles.viewDocument(docData.url, fileType);
				}
				
			};
		}
	};
}]);