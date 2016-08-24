bScope = "";

(function() {
	'use strict';

	angular.module('app.barcodeDetails').controller('barcodeDetailsController', BarcodeDetailsController);

	function BarcodeDetailsController($scope) {
		
		console.log("BarcodeDetailsController")
		
		bScope = $scope;
		
		$scope.barcodeItem = $scope.getCurrentStateParams();
		$scope.barcodeItem.pageName = "";
		
		if($scope.barcodeItem.category == $scope.BARCODE_CATEGORIES.WEBLINK) {
			$scope.getPageNameFromURL($scope.barcodeItem.title).then(function(res){
				$scope.barcodeItem.pageName = res;
				if ($scope.$root.$$phase != '$apply'){
					$scope.$apply();
				}
			})
		}
		
		else if($scope.barcodeItem.category == $scope.BARCODE_CATEGORIES.VCARD) {
			var formattedDetails = {};
			var vCardFields = $scope.barcodeItem.vCardFields;
			
			if( vCardFields ) {
				if( vCardFields.adr ) {
					formattedDetails.address = vCardFields.adr.replace(/;/g, " ").trim();
				}
				if( vCardFields.email ) {
					formattedDetails.emailIdArray = [];
					for( var index=0; index<vCardFields.email.length; index++ ) {
						var emailDetails = vCardFields.email[index];
						var emailItem = {};
						for( var innerIndex=0; innerIndex<emailDetails.value.length; innerIndex++ ) {
							emailItem.emailId = emailDetails.value[innerIndex];
							emailItem.type = emailDetails.meta.TYPE;
							//console.log(emailItem);
							formattedDetails.emailIdArray.push(emailItem);
						}
					}
				}
			}
			$scope.barcodeItem.formattedDetails = formattedDetails;
		}
	}
})();