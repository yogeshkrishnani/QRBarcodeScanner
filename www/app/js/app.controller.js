/* Application Controller - IONIC
 * 
 * @Contributors
 * Yogesh Krishnani
 *
 * @Version
 * 1.0
 *
 */
 
appScope = "";

(function() {
    'use strict';
    
	angular.module(config.applicationModuleName).controller('appCtrl',['$scope' , function($scope) {
	
		console.log("in appCrl");
		
		appScope = $scope;
		
		$scope.BARCODE_CATEGORIES = {
			"TEXT" : 1,
			"EMAIL" : 2,
			"SMS" : 3,
			"WEBLINK" : 4,
			"VCARD" : 5,
			"PRODUCT" : 6
		}
		
		$scope.vCardParser = function(input) {
			
			var Re1 = /^(version|fn|title|org|adr|bday|url):(.+)$/i;
			var Re2 = /^([^:;]+);([^:]+):(.+)$/;
			var ReKey = /item\d{1,2}\./;
			var fields = {};

			input.split(/\r\n|\r|\n/).forEach(function (line) {
				var results, key;

				if (Re1.test(line)) {
					results = line.match(Re1);
					key = results[1].toLowerCase();
					fields[key] = results[2];
				} else if (Re2.test(line)) {
					results = line.match(Re2);
					key = results[1].replace(ReKey, '').toLowerCase();

					var meta = {};
					results[2].split(';')
						.map(function (p, i) {
						var match = p.match(/([a-z]+)=(.*)/i);
						if (match) {
							return [match[1], match[2]];
						} else {
							return ["TYPE" + (i === 0 ? "" : i), p];
						}
					})
						.forEach(function (p) {
						meta[p[0]] = p[1];
					});

					if (!fields[key]) fields[key] = [];

					fields[key].push({
						meta: meta,
						value: results[3].split(';')
					})
				}
			});

			return fields;
		};
		
		$scope.emailCardParser = function(input) {
			//b.text.substring(b.text.indexOf("MATMSG:TO:") + "MATMSG:TO:".length)
			
			input = input.split("MATMSG:")[1];
			
			var Re1 = /^(to|sub|body):(.+)$/i;
			var Re2 = /^([^:;]+);([^:]+):(.+)$/;
			var ReKey = /item\d{1,2}\./;
			var fields = {};

			input.split(";").forEach(function (line) {
				var results, key;

				if (Re1.test(line)) {
					results = line.match(Re1);
					key = results[1].toLowerCase();
					fields[key] = results[2];
				} else if (Re2.test(line)) {
					results = line.match(Re2);
					key = results[1].replace(ReKey, '').toLowerCase();

					var meta = {};
					results[2].split(';')
						.map(function (p, i) {
						var match = p.match(/([a-z]+)=(.*)/i);
						if (match) {
							return [match[1], match[2]];
						} else {
							return ["TYPE" + (i === 0 ? "" : i), p];
						}
					})
						.forEach(function (p) {
						meta[p[0]] = p[1];
					});

					if (!fields[key]) fields[key] = [];

					fields[key].push({
						meta: meta,
						value: results[3].split(';')
					})
				}
			});

			return fields;
		};
		
		$scope.smsCardParser = function(input) {
			var smsDetails = input.split("SMSTO:")[1];
			var tmpSmsArr = smsDetails.split(":");
			var to = tmpSmsArr[0];
			var msg = tmpSmsArr[1];
			
			return {
				to : to,
				msg : msg
			}
		}
		
		$scope.getBarcodeCategory = function(barcodeData) {
			
			//console.log("getBarcodeCategory For : "  + barcodeData.text);
			
			var text = barcodeData.text;
			var format = barcodeData.format;
			var category = -1;
			
			if(format === "EAN_8" || format === "EAN_13" || format === "UPC_A" || format === "UPC_E") {
				category = $scope.BARCODE_CATEGORIES.PRODUCT;
			}
			else if(text.indexOf("BEGIN:VCARD") == 0) {
				category = $scope.BARCODE_CATEGORIES.VCARD;
			}
			else if(text.indexOf("MATMSG:") == 0) {
				category = $scope.BARCODE_CATEGORIES.EMAIL;
			}
			else if(text.indexOf("SMSTO:") == 0) {
				category = $scope.BARCODE_CATEGORIES.SMS;
			}
			else if(text.match(appConfig.urlRegex)) {
				category = $scope.BARCODE_CATEGORIES.WEBLINK;
			}
			else {
				category = $scope.BARCODE_CATEGORIES.TEXT;
			}
			
			//console.log("category : "  + category);
			
			return category;
		};

	}]);

})();