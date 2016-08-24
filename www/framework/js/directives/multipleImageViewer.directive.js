/*************************** Multiple Image Viewer ***********************************/
angular.module(config.appDirectives).directive('multipleImageViewer',[function() {
    return {
        restrict: 'E',
        template: function(element, attrs) {
            var htmlText = '<ion-scroll class="ionImgViewer" zooming="false" direction="x" style="width: 100%;">' + 
            	'<ul>' + 
					'<li class="imageContainer" ng-repeat="imageData in '+ attrs['ngData'] + ' track by $index" ng-click="viewImages('+attrs['ngData']+', ($index+1))"><div class="imageBox" style="background-image: url({{imageData.url}})"></div></li>' + 
					'<div class="clear"></div>' + 
				'</ul></ion-scroll>';
            
            return htmlText;
        },
        link: function(scope, element, attrs) {
        	
        },
        controller: function($scope) {
        	$scope.viewImages = function(imagesData, imageIndex) {
    			WL.Logger.info("In viewImages function");
    			$scope.showNextPage('app.customer.zoomableImageGallery', {
    				data : {
    					imagesData : imagesData,
    					startIndex : imageIndex,
    				}
    			});
    		};
        }
    };
}]);