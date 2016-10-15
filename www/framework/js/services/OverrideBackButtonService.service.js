/* OverrideBackButtonService - 
 * 
 * @Features
 * overrideIonicBackButton
 * 
 * @Contributors
 * Lubna Shaikh
 * Parth Hirpara
 * Yogesh Krishnani
 *
 * @Version
 * 1.0
 *
 */

(function () {
	'use strict';

	angular
	.module(config.appServices)
	.service('OverrideBackButtonService', OverrideBackButtonService);

	OverrideBackButtonService.$inject = ['$ionicPlatform', '$rootScope'];

	function OverrideBackButtonService($ionicPlatform, $rootScope) {

		this.overrideIonicBackButton = function ($viewScope, customBackFunction) {

			if (angular.isUndefined($viewScope) || angular.isUndefined(customBackFunction) || typeof customBackFunction != "function") {
				console.log("Pass valid argumets to handleIonicBackButton");
				return;
			}

			var customBackLogic = function () {
				
				// override soft back
				// framework calls $scope.$ionicGoBack when soft back button is pressed
				var oldSoftBack = $rootScope.$ionicGoBack;
				$rootScope.$ionicGoBack = function () {
					console.log("Custom back button called");
					customBackFunction();
				};

				var deregisterSoftBack = function () {
					$rootScope.$ionicGoBack = oldSoftBack;
				};

				// override hard back
				// registerBackButtonAction() returns a function which can be used to deregister it
				var deregisterHardBack = $ionicPlatform.registerBackButtonAction(
						customBackFunction, 101);

				// cancel custom back behaviour
				$viewScope.$on('$ionicView.beforeLeave', function () {
					deregisterHardBack();
					deregisterSoftBack();
				});

			};

			$viewScope.$on('$ionicView.enter', function () {
				customBackLogic();
			});
		};
	}
})();