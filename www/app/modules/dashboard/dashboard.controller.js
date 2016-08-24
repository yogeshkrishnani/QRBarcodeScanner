dScope = "";
(function() {
	'use strict';

	angular.module('app.dashboard').controller('dashboardController', DashboardController);

	function DashboardController($scope, Auth, $cordovaBarcodeScanner) {
		
		dScope = $scope;
		
		ionic.Platform.ready(function() {
			
			
		});
		
		$scope.barcodeItems = [{
			"title" : "https://www.linkedin.com",
			"category" : $scope.BARCODE_CATEGORIES.WEBLINK
		},{
			"title" : "Yogesh Krishnani",
			"category" : $scope.BARCODE_CATEGORIES.TEXT
		}];
		
		$scope.scanBarcode = function() {
			if(typeof cordova !== "undefined") {
				$cordovaBarcodeScanner
				.scan()
				.then(function(barcodeData) {
					
					// Success! Barcode data is here
					console.log("success", barcodeData);
					
					if(barcodeData) {
						if(barcodeData.cancelled != true && barcodeData.cancelled != "true") {
							barcodeData.timestamp = Date.now();
							$scope.saveBarcodeItem(barcodeData);
						}
						else {
							$scope.showToast($scope.getMessage("barcodeError"), $scope.getMessage("barcodeCancelled"));
						}
					}
					else {
						$scope.showToast($scope.getMessage("barcodeError"), $scope.getMessage("unknownError"));
					}
			
				}, function(error) {
					$scope.showToast($scope.getMessage("barcodeError"), $scope.getMessage("deviceNotSupported"));
					// An error occurred
				});
			}
		};
		
		$scope.saveBarcodeItem = function(barcodeData) {
			var BARCODE_CATEGORIES = $scope.BARCODE_CATEGORIES;
			var barcodeCategory = $scope.getBarcodeCategory(barcodeData);
			var barcodeItem = {
				category : barcodeCategory,
				barcodeData : barcodeData
			};
			
			switch(barcodeCategory) {
											   
				case BARCODE_CATEGORIES.VCARD : barcodeItem.vCardFields = $scope.vCardParser(barcodeData.text);
												barcodeItem.title = barcodeItem.vCardFields.fn;
												break;
											   
				case BARCODE_CATEGORIES.EMAIL : barcodeItem.emailFields = $scope.emailCardParser(barcodeData.text);
												barcodeItem.title = barcodeItem.emailFields.to;
												break;
				
				case BARCODE_CATEGORIES.SMS :   barcodeItem.smsFields = $scope.smsCardParser(barcodeData.text);
												barcodeItem.title = barcodeItem.smsFields.to;
												break;												

				
				case BARCODE_CATEGORIES.WEBLINK : barcodeItem.title = barcodeData.text;
												  break;
				
				case BARCODE_CATEGORIES.TEXT :  
				default : 						barcodeItem.title =  barcodeData.text;
			}
			
			$scope.barcodeItems.push(barcodeItem);
			
		};
		
		$scope.moveItem = function(item, fromIndex, toIndex) {
			$scope.barcodeItems.splice(fromIndex, 1);
			$scope.barcodeItems.splice(toIndex, 0, item);
		};
		
		$scope.showBarcodeDetails = function(barcodeItem) {
			$scope.showNextPage("app.view.barcodeDetails", barcodeItem)
		};
	  
		if(config.useLogin) {
			$scope.username = WL.Client.getUserName("UserIdentity");
		}
		else {
			$scope.username = "Anonymous";
		}
		
		$scope.goToDemoPage = function() {
			$scope.showNextPage('app.view.demo');  
		};
		
		$scope.saveBarcodeItem({"text":"MATMSG:TO:yogesh.h.krishnani@gmail.com;SUB:Subject Line;BODY:Message Lines;;","format":"QR_CODE","cancelled":false});
		$scope.saveBarcodeItem({"text":"SMSTO:9898619162:SMS Line","format":"QR_CODE","cancelled":false});
		$scope.saveBarcodeItem({"text":"BEGIN:VCARD\nVERSION:3.0\nN:Krishnani;Yogesh\nFN:Yogesh Krishnani\nORG:Streebo\nTITLE:Consultant\nADR:;;88/463;Ahmedabad;Gujarat;382424;India\nTEL;WORK;VOICE:\nTEL;CELL:9898619162\nTEL;FAX:\nEMAIL;WORK;INTERNET:yogesh.h.krishnani@gmail.com\nURL:\nBDAY:07/07/1991\nEND:VCARD\n","format":"QR_CODE","cancelled":false});
	}
})();