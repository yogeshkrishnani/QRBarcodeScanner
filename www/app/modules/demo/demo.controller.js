(function() {
	'use strict';

	angular.module('app.demo').controller('demoController', DemoController);

	function DemoController($scope) {
		
		$scope.goBackToDashboard = function() {
			$scope.showPrevPage();
		};
		
	}
})();