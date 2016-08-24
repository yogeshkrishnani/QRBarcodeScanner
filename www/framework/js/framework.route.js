
var translateProvider = "";

(function() {
	"use strict";

	angular.module(config.frameworkModuleName).config(function($stateProvider, $urlRouterProvider, $translateProvider, $ionicConfigProvider, $compileProvider) {
		
		for(var lang in Messages){
			$translateProvider.translations(lang, Messages[lang]);
		}
		
		$translateProvider.preferredLanguage(config.appLanguagePreference.preferredLanguage);
	    $translateProvider.fallbackLanguage(config.appLanguagePreference.fallbackLanguage);
	    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
        
        $ionicConfigProvider.views.forwardCache(false);
        
        $compileProvider.debugInfoEnabled(false);
        $ionicConfigProvider.backButton.text('');
		$ionicConfigProvider.views.swipeBackEnabled(false);
		
		$ionicConfigProvider.scrolling.jsScrolling(true);
		/*if(ionic.Platform.isIOS()) {
			$ionicConfigProvider.scrolling.jsScrolling(true);
     	} else if(ionic.Platform.isAndroid()) {
     		$ionicConfigProvider.scrolling.jsScrolling(false);
     	}*/
        
		/* Parent State of application */
		$stateProvider.state("app", {
			abstract : true,
			url : "/app",
			templateUrl : "framework/templates/theme.html",
			controller : 'appCtrl'
		});
		
		/* Login state. Not extended to app as It is not using theme provided by 'app' */
		if( config.useLogin ) {
			$stateProvider.state("login", {
				url: "/login",
				templateUrl : "app/modules/login/login.html",
				controller : 'LoginCtrl',
	            cache : false
			});
			
			// Default view to show
			$urlRouterProvider.otherwise('/login');
		}
		
		$stateProvider.state("app.view", {
			abstract : true,
			url : "/view",
			views : {
				"appView" : {
					templateUrl : "framework/templates/appView.html"
				},
				"settings" : {
					templateUrl : "app/templates/settings.html"
				},
				"menu": {
					templateUrl: "app/templates/menu.html"
				}
			}
		});
		
        
	}).run(function ($rootScope, $state, $stateParams, $ionicPlatform, Auth) {
        
		$rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        
        if( config.useLogin ) {
        	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        		if (toState.url != "/login" && !Auth.isUserLoggedIn()) {
                    event.preventDefault();
                    $state.go('login');
                }
        	});
        }
    });
})();