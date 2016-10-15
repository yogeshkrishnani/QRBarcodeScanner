/* Framework Configuration - IONIC
 * 
 * @Contributors
 * Yogesh Krishnani
 * Parth Hirpara
 *
 * @Version
 * 1.2
 *
 */

(function() {
	'use strict';

	window.config  = (function () {
		
		/**************************************  Master List Start ***************************************/
		var spinnerTypes = {
			ANDROID : "android",
			IOS : "ios",
			BUBBLES : "bubbles",
			CIRCLES : "circles",
			CRESCENT : "crescent",
			DOTS : "dots",
			LINES : "lines",
			RIPPLE : "ripple",
			SPIRAL : "spiral"
		};
		var cssPageTransitionType = {
			PLATFORM : 'platform',
			ANDROID : 'android',
			IOS : 'ios',
			NONE : 'none',
		};
		/**************************************  Master List End ****************************************/
		
	
		/********************************** Master Config Start ************************************/
		var useWL = false;
		var useLogin = true;
		var authAdapter = "Authentication";
		var realmName = "UserIdentity";
		var viewCache = {};
		var connectionTimeout = 30000;
		var overrideHardwareBackButton = true;
		
		var appLanguagePreference = {
			preferredLanguage : "en",
			fallbackLanguage : "en"
		};
		
		var theme = {
			cssPageTransitionType : cssPageTransitionType.PLATFORM,
			enableNativePageTransition : true,
			nativePageTransition : { // Only applies to devices
				animation : "slide", // slide, curl(Ios Only), fade 
				options : {
					duration : 400,
					iosdelay : 60, // a number of milliseconds, or -1 (call executePendingTransition() when ready)
					androiddelay : 70, // a number of milliseconds, or -1 (call executePendingTransition() when ready)
					winphonedelay : 200,
					slowdownfactor : 4,
					fixedPixelsTop : 44, //Header Height - currently for animation slide left/right only
					fixedPixelsBottom : 0 //Footer Height -  currently for animation slide left/right only
				}
			},
			enableMenuWithBack : false,
			spinner : "<br/><ion-spinner icon='" + spinnerTypes.ANDROID + "' class='spinner-light'></ion-spinner><br/><br/>"
		};
		
		var getPageTransitionType = function() {
			return config.theme.nativePageTransition.animation;
		};
		
		var isNativePageTransitionEnabled = function() {
			return config.theme.enableNativePageTransition && ionic.Platform.isAndroid() && typeof cordova != "undefined";
		};
		
		/* Modules & Dependency Config */
		var frameworkModuleName = 'framework';
		var applicationModuleName = 'app';
		var appDirectives = 'directives';
		var appFilters = 'filters';
		var appServices = 'services';
		
		var frameworkModuleVendorDependencies = ["pascalprecht.translate"]; 
		var baseFrameworkModules = [appDirectives, appFilters, appServices];
		var ionicModule = "ionic";
		
		var registerFrameworkModule = function(moduleName, dependencies) {
			dependencies = dependencies || [];
			angular.module(moduleName, dependencies);
			angular.module(frameworkModuleName).requires.push(moduleName);
		};
		
		var addFrameworkDependency = function(dependency) {
			angular.module(frameworkModuleName).requires.push(dependency);
		};
		
		var registerApplicationModule = function(moduleName, dependencies) {
			dependencies = dependencies || [];
			angular.module(moduleName, dependencies);
			angular.module(applicationModuleName).requires.push(moduleName);
		};
		
		var addApplicationDependency = function(dependency) {
			angular.module(applicationModuleName).requires.push(dependency);
		};
		
		/********************************** Master Config End ************************************/
		
		return {
			authAdapter : authAdapter,
			realmName : realmName,
			viewCache : viewCache,
			connectionTimeout : connectionTimeout,
			overrideHardwareBackButton : overrideHardwareBackButton,
			appLanguagePreference : appLanguagePreference,
			theme : theme,
			getPageTransitionType : getPageTransitionType,
			isNativePageTransitionEnabled : isNativePageTransitionEnabled,
			frameworkModuleName : frameworkModuleName,
			applicationModuleName : applicationModuleName,
			appDirectives : appDirectives,
			appFilters : appFilters,
			appServices : appServices,
			baseFrameworkModules : baseFrameworkModules,
			frameworkModuleVendorDependencies : frameworkModuleVendorDependencies,
			registerFrameworkModule : registerFrameworkModule,
			addFrameworkDependency : addFrameworkDependency,
			registerApplicationModule : registerApplicationModule,
			addApplicationDependency : addApplicationDependency,
			useWL : useWL,
			useLogin : useLogin
		}
		
	})();
})();