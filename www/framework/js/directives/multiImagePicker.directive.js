angular.module(config.appDirectives).directive('multipleImagePicker',['MultipleImagePickerDelegate',  function(MultipleImagePickerDelegate) {

    return {
        restrict: 'E',
        template: function(element, attrs) {
            var htmlText = '<ion-scroll class="ionImgPicker"  zooming="false" direction="x" style="width: 100%;">' +  
            	'<ul>' + 
            		'<li class="btnAdd imageContainer" ng-click="addImage()">+</li>' +
					'<li class="imageContainer" ng-repeat="image in capturedImages track by $index" ng-click="removeImage($index)"><div class="imageBox" style="background-image: url({{image}})"></div></li>' + 
					'<div class="clear"></div>' + 
				'</ul></ion-scroll>';
            
            return htmlText;
        },
        link: function(scope, element, attrs) {

        },
        controller: function($scope) {
        	
        	$scope.capturedImages = new Array();
        	
        	$scope.cameraPluginCallback = function(response) {
				
				console.log(response);
				
				var responseFlag = response.flag;
				if( responseFlag == _cameraFlag.UNSUPPORTED_DEVICE && false) {
					$scope.showToast($scope.getMessage("featureNotAvailableTitle"), $scope.getMessage("cameraFeatureNotAvailableMessage"));
					return;
				}
				
				if($scope.actionRemove == true) {
					$scope.capturedImages.splice($scope.imageIndex, 1);
					$scope.imageCaptions.splice($scope.imageIndex, 1);
					MultipleImagePickerDelegate.setCapturedImages( $scope.capturedImages );
				}
				else {
					$scope.capturedImages.push(response.fileURI);
				}
				
				MultipleImagePickerDelegate.setCapturedImages( $scope.capturedImages );
				
				if ($scope.$root.$$phase != '$apply'){
					$scope.$apply();
				}
			};
        	
        	$scope.addImage = function() {
    			WL.Logger.info("In addImage function");
    			$scope.actionRemove = false;
    			var addImageOptions = {
					showOnlyAddOptions : true,
    				title : 'Add Image'
    			};
    			
    			var options = $.extend( addImageOptions, MultipleImagePickerDelegate.getOptions() );
    			
    			$scope.showCameraPopUpModal($scope.cameraPluginCallback, options);
    		};
    		
    		$scope.removeImage = function(index) {
    			WL.Logger.info("In removeImage function");
    			$scope.imageIndex = index;
    			$scope.actionRemove = true;
    			var removeImageOptions = {
					showOnlyRemoveOptions : true,
    				title : ''	
    			};
    			var options = $.extend( removeImageOptions, MultipleImagePickerDelegate.getOptions() );
    			
    			$scope.showCameraPopUpModal($scope.cameraPluginCallback, options);
    		};
        }
    };
}]);