
(function() {
	"use strict";

	angular.module("app").config(function($stateProvider, $urlRouterProvider, $compileProvider) {
		
		console.log("In app.route");
		
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|sms|file):/);
		
		$stateProvider.state("app.view.dashboard", {
			url : "/dashboard",
			views : {
				"content" : {
					templateUrl : "app/modules/dashboard/dashboard.html",
					controller : "dashboardController"
				}
			}
		});
		
		$stateProvider.state("app.view.demo", {
			url : "/demo",
			views : {
				"content" : {
					templateUrl : "app/modules/demo/demo.html",
					controller : "demoController"
				}
			}
		});
		
		$stateProvider.state("app.view.barcodeDetails", {
			url : "/barcodeDetails",
			views : {
				"content" : {
					templateUrl : "app/modules/barcodeDetails/barcodeDetails.html",
					controller : "barcodeDetailsController"
				}
			}
		});
		
		if( !config.useLogin ) {
			$urlRouterProvider.otherwise('/app/view/dashboard');
		}
        
	}).run(function ($rootScope, $state, $stateParams, $ionicPlatform, Auth) {
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
			if (toState.url != "/dashboard" && fromState.views == null) {
                event.preventDefault();
                $state.go('app.view.dashboard');
            }
		});
	});
})();