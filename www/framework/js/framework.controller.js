/* Framework Controller - IONIC
 * 
 * @Contributors
 * Yogesh Krishnani
 * Parth Hirpara
 * Alfaz Jikani 
 *
 * @Version
 * 1.2
 *
 */
 
scope = "";
fileUtils = "";

(function() {
    'use strict';
    
	angular.module(config.frameworkModuleName).controller('frameworkCtrl',['$scope', '$state', '$ionicConfig', '$ionicLoading', '$ionicPopup', 'Auth', '$ionicHistory', '$timeout', '$ionicPlatform', '$ionicModal', '$ionicNavBarDelegate', '$ionicSideMenuDelegate', '$translate', 'NativePageTransition', 'FileUtils' , function($scope, $state, $ionicConfig, $ionicLoading, $ionicPopup, Auth, $ionicHistory, $timeout, $ionicPlatform, $ionicModal, $ionicNavBarDelegate, $ionicSideMenuDelegate, $translate, NativePageTransition, FileUtils) {
		
		console.log("frameworkCtrl");
		
        scope = $scope;
        fileUtils = FileUtils;

        $scope.config = config;
        $scope.stateParams = {};

        $ionicPlatform.ready(function() {
        	if( $scope.config.isNativePageTransitionEnabled() ) {
           	 	$ionicConfig.views.transition('NONE');
           	 	
           	 	var customOptions = $scope.config.theme.nativePageTransition.options;
           	 	var globalOptions = window.plugins.NativePageTransitionPlugin.globalOptions;

           	 	$.extend(true, globalOptions, customOptions);
        	}
        	else {
        		$ionicConfig.views.transition($scope.config.theme.cssPageTransitionType);
        	}
        });
        
        $scope.showNextPage = function(view, data, options, callback) {

        	$scope.stateParams[view] = data;

        	if(!config.viewCache[view]) {
    			config.viewCache[view] = {};
    		}
        	
        	if(options != undefined) {
        		if(options.reload == true) {
            		config.viewCache[view].reload = true;
        		}
        	}
        	
        	$state.go(view);
        	
        	if( $scope.config.isNativePageTransitionEnabled() ) {
        		NativePageTransition.showNextPage(options, callback);
        	}
        	else {
        		if (typeof callback == "function") callback();
        	}
        	
        };
        
        $scope.showPrevPage = function(data, options, callback) {

            if ($ionicHistory.backView() == null)
                return;
            
            var prevPageStateName = "";
            
            if(options && options.pageCount) {
            	var currentView = $ionicHistory.currentView();
            	var viewHistory = $ionicHistory.viewHistory();
            	var currentStateHistory = viewHistory.histories[currentView.historyId];
            	//console.log("targetStateHistory", targetStateHistory);
            	if( currentStateHistory != undefined ) {
            		var stack = currentStateHistory.stack;
            		var targettedStateStackPos = stack.length + options.pageCount  - 1;
            		//console.log("stack", stack);
            		//console.log("targettedStateStackPos", targettedStateStackPos);
                	if(targettedStateStackPos > 0 && stack[targettedStateStackPos]) {
                		 prevPageStateName = stack[targettedStateStackPos].stateName;
                		 console.log("prevPageStateName", prevPageStateName);
                	}
            	}
            }
            else {
            	 prevPageStateName = $ionicHistory.backView().stateName;
            }
           
            
            if(!config.viewCache[prevPageStateName]) {
    			config.viewCache[prevPageStateName] = {};
    		}
            
            if(options != undefined) {
        		if(options.reload == true) {
            		config.viewCache[prevPageStateName].reload = true;
        		}
        	}
            
            if(options && options.pageCount) {
            	$ionicHistory.goBack(options.pageCount);
            }
            else {
                $state.go(prevPageStateName);
            }
            
            if( $scope.config.isNativePageTransitionEnabled() ) {
        		NativePageTransition.showPrevPage(options, callback);
        	}
        	else {
        		if (typeof callback == "function") callback();
        	}
        };
        
        $scope.getCurrentStateParams = function() {
        	return $scope.stateParams[$ionicHistory.currentView().stateName];
        }; 
        
        $scope.ionicGoBack = $scope.showPrevPage;
        
        $scope.handleViewCaching = function(obj) {
        	
        	var viewScope = obj.viewScope;
        	var viewController = obj.viewController;
        	var viewStateName = obj.viewStateName;
        
        	viewScope.$on('$ionicView.enter', function (event, viewData) {
        		if(config.viewCache[viewStateName]) {
        			console.log("Reload " + viewStateName + " : " + config.viewCache[viewStateName].reload);
        			if(config.viewCache[viewStateName].reload == true) {
        				console.log("Invoking View Controller");
        				viewController();
        			}
        		}
    		});
    		
        	viewScope.$on('$ionicView.beforeLeave', function (event, viewData) {
        		console.log("Reseting Reload Values For " + viewStateName);
    			config.viewCache[viewStateName].reload = false;
    		});
        	
        };
        
        $scope.overrideIonicBackButton = function($viewScope, doCustomBack) {
        	
        	if(angular.isUndefined($viewScope) || angular.isUndefined(doCustomBack) || typeof doCustomBack != "function"){
        		console.log("Pass valid argumets to overrideIonicBackButton");
        		return;
        	}
        	console.log("In overrideIonicBackButton");
    		// override soft back
    		// framework calls $scope.$ionicGoBack when soft back button is pressed
    		var oldSoftBack = $scope.$ionicGoBack;
    		$scope.$ionicGoBack = function() {
    			console.log("Custom back button called");
    		    doCustomBack();
    		};
    		var deregisterSoftBack = function() {
    		    $scope.$ionicGoBack = oldSoftBack;
    		};

    		// override hard back
    		// registerBackButtonAction() returns a function which can be used to deregister it
    		var deregisterHardBack = $ionicPlatform.registerBackButtonAction(
    		    doCustomBack, 101
    		);

    		// cancel custom back behaviour
    		$viewScope.$on('$destroy', function() {
    		    deregisterHardBack();
    		    deregisterSoftBack();
    		});
        	
        };
        /**************************** Ionic Loading Indicator ***************************************/
        $scope.showLoadingIndicator = function(message) {

            if (!message) message = "";

            $ionicLoading.show({
                template: $scope.config.theme.spinner + message,
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0
            });
        };
        $scope.hideLoadingIndicator = function() {
            $ionicLoading.hide();
        };
        
        /**************************** Get Translated Message ***************************************/
        $scope.getMessage = function(MESSAGE_KEY) {
        	return $translate.instant(MESSAGE_KEY);
        };
        
        /**************************** Change App Language ***************************************/
        $scope.changeLanguage = function(preferredLang) {
        	$translate.use(preferredLang);
		};
        
        /**************************** Ionic Header Bar ***************************************/
        $scope.showHeaderBar = function() { // displays hidden header bar
        	$ionicNavBarDelegate.showBar(true);
			$ionicSideMenuDelegate.canDragContent(true);
        };
        $scope.hideHeaderBar = function() { // hides header bar
        	$ionicNavBarDelegate.showBar(false);
			$ionicSideMenuDelegate.canDragContent(false);
        };
        $scope.hideHeaderBarForCurrentView = function(viewScope) {
        	viewScope.$on('$ionicView.enter', function (event, viewData) {
        		$scope.hideHeaderBar();
    		});
        	viewScope.$on('$ionicView.beforeLeave', function (event, viewData) {
        		$scope.showHeaderBar();
    		});
        }  

        /**************************** Ionic Alert Messsage ***************************************/
        $scope.closePopUp = function(ionicPopUp) {
        	var popUp = ionicPopUp || $scope.ionicPopUp;
        	if (popUp != null) {
        		popUp.close();
                $(".popup-container").remove(); // Ionic popup remove patch
                popUp = null;
            }
        };
        $scope.showAlert = function(title, message, callback) {

        	$scope.closePopUp();

            $scope.ionicPopUp = $ionicPopup.show({
                title: title,
                template: message,
                buttons: [{
                    text: 'OK',
                    type: 'button-clear',
                    onTap: function(e) {
                    	$scope.closePopUp();
                        if (typeof callback == "function")
                            callback();
                    }
                }],
            });
        };

        /**************************** Ionic Confirm Message ***************************************/
        $scope.showConfirm = function(title, message, callback) {

        	$scope.closePopUp();

            $scope.ionicPopUp = $ionicPopup.show({
                title: title,
                template: message,
                buttons: [{
                    text: 'Cancel',
                    type: 'button-clear',
                    onTap: function(e) {
                    	$scope.closePopUp();
                        if (typeof callback == "function")
                            callback(false);
                    }
                }, {
                    text: 'OK',
                    type: 'button-clear',
                    onTap: function(e) {
                    	$scope.closePopUp();
                        if (typeof callback == "function")
                            callback(true);
                    }
                }],
            });
        };
        
        /**************************** Native Toast Message ***************************************/
        $scope.showToast = function(title, message, callback, options){
        	if(message == undefined){
        		message =  title;
        	}
        	if(nativeToast.isSupported()){
        		nativeToast.showToast(message, options, callback);
        	} else {
        		$scope.showAlert(title, message, callback);
        	}
        };
        /**************************** User Authentication Handler  ***************************************/
        if( config.useLogin ) {
        	$scope.$watch(Auth.isUserLoggedIn, function(value, oldValue) {
                if (!value) {
                    console.log("User Is Not Logged In, Redirecting to Login Page");
                    $state.go('login', {}, {reload: true});
                }
                if (value) {
                    console.log("User Is Logged In");
                }
            }, true);
        }
        
        /*************************************** Authenticate User ********************************************/
        $scope.authenticationService = function(param , successCallback, failureCallback) {
    		
    		var requestObject = {};
    		requestObject.record = param;
    		
    		var invocationData = {
    	        adapter : config.authAdapter,
    	        procedure : 'authenticateUser',
    	        parameters : [requestObject]
    	    };
    		
    		if(successCallback == undefined) 
    			successCallback = function() {};
    		if(failureCallback == undefined) 
    			failureCallback = function() {};

    		var options = {
    		    onSuccess : successCallback,
    		    onFailure : failureCallback,
    		    timeout   : config.connectionTimeout
    		};
    		
    		WL.Client.invokeProcedure(invocationData,options);
    	};
    	
    	$scope.reloadApp = function() {
    		//WL.Client.reloadApp();
			document.location.reload(true);
    	};
        
    	$scope.logoutUserFromApp = function() {
    		/*Auth.logoutUser(); // triggers watch function of 'Auth' factory and redirects user to login page
            $timeout(function() { //clear ionic cache and history
 	           $scope.clearCacheAndHistory();
       		}, 500);*/
    		$scope.reloadApp();
    	};
    	
        /*************************************** Logout User ********************************************/
    	$scope.logoutUser = function() {
			var logoutSuccess = function(response) {
				WL.Logger.info("Logout Success : " + JSON.stringify(response));
				$scope.hideLoadingIndicator();
				$scope.logoutUserFromApp();
			};
			var logoutFailure = function(response) {
				WL.Logger.info("Error occurred while logging out : " + JSON.stringify(response));
				$scope.hideLoadingIndicator();
				$scope.logoutUserFromApp();
			};
			
			var options = {
				onSuccess : logoutSuccess,
    		    onFailure : logoutFailure
			};
			
			$scope.showLoadingIndicator();
			WL.Client.logout(config.realmName, options);
			
			/*There is a known issue currently in MobileFirst Platform 7.1
			APAR PI47591 WL.CLIENT.LOGOUT CALLBACK DOES NOT WORK IN HYBRID PREVIEW
			http://stackoverflow.com/questions/32303003/wl-client-logout-not-calling-its-onsuccess-or-onfailure-callbacks*/
			if(WL.Client.getEnvironment() == WL.Environment.PREVIEW) {
				$timeout(function() {
					logoutSuccess();
				}, 2500);
			}
        };
        
        $scope.showadapterFailMessage = function(response) {
    		if(response!=undefined)
    			WL.Logger.info("Adapter Failure! " + JSON.stringify(response));
    		
    		$scope.hideLoadingIndicator();
    		$scope.showToast($scope.getMessage("adapterFailTitle"), $scope.getMessage("adapterFailMessage"));
    	};

        /**************************** Clear Ionic Cache & History ***************************************/
    	$scope.clearCacheAndHistory = function() { //clear ionic cache and history
    		console.log("In clearCacheAndHistory");
    		$ionicHistory.clearCache();
            $ionicHistory.clearHistory();
    	};
    	
    	/************************************ Direct Update Check **************************************/
        $scope.checkForDirectUpdate = function() {
            //WL.Client.checkForDirectUpdate();
            WL.Client.login("wl_directUpdateRealm",{
		 		onSuccess : function() {},
		 		onFailure : function() {}
		 	});
        };

        /**************************** Session Handling Functions  ***************************************/
        //$scope.AuthRealmChallengeHandler = WL.Client.createChallengeHandler("UserIdentity");

        // $scope.AuthRealmChallengeHandler.isCustomResponse = function(response) {
            // if (!response || !response.responseJSON || response.responseText === null) {
                // return false;
            // }
            // if (typeof(response.responseJSON.authRequired) !== 'undefined') {
                // $scope.AuthRealmChallengeHandler.handleChallenge(response); //Unauthenticated access attempt
            // } else {
                // return false;
            // }
        // };

        // $scope.AuthRealmChallengeHandler.handleChallenge = function(response) {
            // var authRequired = response.responseJSON.authRequired;
            // if (authRequired == true) {
                // if (Auth.isUserLoggedIn()) {
                    // $scope.AuthRealmChallengeHandler.submitFailure();
                    // WL.SimpleDialog.show($scope.getMessage("errorTitle"), $scope.getMessage("sessionExpiredMsg"), [{
                        // text: 'OK',
                        // handler: function() {
                           // WL.Client.reloadApp();
                        // }
                    // }]);
                // }
            // } else if (authRequired == false) {
                // $scope.AuthRealmChallengeHandler.submitFailure();
            // }
        // };

        /**************************** Device Back Button Handler  ***************************************/
        $ionicPlatform.registerBackButtonAction(function(event) {
            event.preventDefault();
        }, 100);

        $scope.deviceBackButtonHandler = function() {
            console.log("Back button fired -- page : " + window.location.hash);
            if ($ionicHistory.backView() && $ionicHistory.backView().stateName == "login") {
                $scope.deviceBackButtonExit();
            } else {
                $scope.showPrevPage();
            }
        };

        $scope.deviceBackButtonExit = function() {
            WL.Toast.show($scope.getMessage("deviceBackBtnExitMsg"));
            WL.Logger.info("deviceBackButtonExit fired");
            WL.App.resetBackButton();
            WL.App.overrideBackButton(function() {
                navigator.app.exitApp();
            });
            setTimeout(function() {
                WL.App.resetBackButton();
                WL.App.overrideBackButton($scope.deviceBackButtonHandler);
            }, 2000);
        };

        if (config.overrideHardwareBackButton)
            //WL.App.overrideBackButton($scope.deviceBackButtonHandler);

        /******************************* Date picker & Keyboard Plugin *******************************/
        
        $scope.initPlugins = function() {
        	
        	// var platform = undefined;
    		
    		// if(ionic.Platform.isAndroid()){
    			// platform = nativeDatePicker.platforms.ANDROID;
    		// }else if(ionic.Platform.isIOS()){
    			// platform = nativeDatePicker.platforms.IOS;
    		// }
    		
    		// if(typeof platform != undefined) {
    			// nativeDatePicker.init(platform);
    		// }
    		
    		// // native keyboard right now applied only for ios
    		// if(ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
    			// console.log("Initiating nativeKeyboard plugin");
    			// nativeKeyboard.init(platform).then(function(res) {
    				// console.log("nativeKeyboard plugin init success");
    	            // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true); // Hide the accessory bar above the keyboard
    	            // cordova.plugins.Keyboard.disableScroll(true); // Disable keyboard auto scroll
    			// });
			// }
    		
    		// imageCache.init();
        };
        
    	ionic.Platform.ready( $scope.initPlugins );
    	
    	$scope.showDatePicker = function(options, callbackSuccess, callbackFailure){
    		if (typeof callbackSuccess != "function") callbackSuccess = function(){};
    		if (typeof callbackFailure != "function") callbackFailure = function(){};
    		
    		var defaultOptions = {
			    date: new Date(),
			    mode: 'date',
			};
    		
    		options = $.extend({}, defaultOptions , options);
    		
    		nativeDatePicker.showDatePicker(options, callbackSuccess, callbackFailure);
    	};
    	
    	$scope.selectDate = function(referenceId, options, callbackSuccess, callbackFailure){
    		if (typeof callbackSuccess != "function") callbackSuccess = function(){};
    		if (typeof callbackFailure != "function") callbackFailure = function(){};
    		
    		var element = $(referenceId);
    		var today = new Date().getTime();
    		var defaultMinDate = undefined;
    		var defaultMaxDate = undefined;
    		
    		var defaultOptions = {
			    dateFormat: 'dd-MMM-yyyy',
			    hideDate : false,
			    minDate : defaultMinDate,
    			maxDate : defaultMaxDate,
				pickerType : "past" //future
			};
    		options = $.extend({}, defaultOptions , options);
    		
    		if(options.pickerType == "past" && options.maxDate == defaultMaxDate){
    			options.maxDate = today;
    		} else if(options.pickerType == "future"  && options.minDate == defaultMinDate){
    			options.minDate = today;
    		} 
    		
    		var dateGetTime = $(element).attr('data-dategettime');
    		if(angular.isDefined(dateGetTime) && !isNaN(dateGetTime)){
    			options.date = new Date(parseInt(dateGetTime));
    		}
    		
    		$scope.showDatePicker(options, function(date){
				 if (date instanceof Date) {
					 var formattedDate = $filter('date')(date, options.dateFormat);
					 if($(element).is("input")) {
						 $(element).val(formattedDate).addClass("used").change();
						 $(element).attr('data-date', date);
						 $(element).attr('data-dategettime', date.getTime());
					 } else {
						 $(element).html(formattedDate);
						 $(element).attr('data-date', date);
						 $(element).attr('data-dategettime', date.getTime());
					 }
				 };
    			callbackSuccess(date);
    		}, callbackFailure);
    	};
        /******************************* Application Foreground Event *******************************/
        $scope.appResumeEventHandler = function() {
            WL.Logger.info("Application Comes In Foreground, Checking For Direct Update");
            $scope.checkForDirectUpdate();
        };

        ionic.Platform.ready(function() { // will execute when device is ready, or immediately if the device is already ready.
            //document.addEventListener("resume", $scope.appResumeEventHandler, false);
        });

        /******************************* Get Current Location *******************************/
        $scope.getCurrentLocation = function() {
        	var Q = $.Deferred();
        	var timeout = ionic.Platform.isIOS() == true ? 30000 : 10000; 
			if (navigator.geolocation) {
				var options = { enableHighAccuracy: true, timeout : timeout };
				navigator.geolocation.getCurrentPosition( Q.resolve, Q.reject, options );
			} else {
				Q.reject();
			}
        	return Q;
		};
		
		/********************************** Adapter invocation code start ************************************/
		$scope.invokeAdapterProcedure = function(obj) {
			var Q = $.Deferred();
			var adapterInvocationSucess = function(response) {
				if(response.responseJSON != undefined && response.responseJSON.authRequired == true) {
					console.log("User Session Expired");
				}
				else if(response.status == 200 && response.responseJSON && response.responseJSON.isSuccessful == true) {
					Q.resolve(response);
				}
				else {
					$scope.showadapterFailMessage(response);
				}
			};
			var adapterInvocationFailure = function(response) {
				if(response.responseJSON != undefined && response.responseJSON.authRequired == true) {
					console.log("User Session Expired");
				}
				else {
					Q.reject(response);
				}
			};
			
			var invocationData = {
				adapter : obj.adapter,
				procedure : obj.procedure,
				parameters : [ obj.param ]
			};
			var options = {
			    onSuccess : adapterInvocationSucess,
			    onFailure : adapterInvocationFailure,
			    timeout   : config.connectionTimeout
			};
			
			console.log(invocationData);
			
			WL.Client.invokeProcedure(invocationData, options);
			
			return Q;
		};
		/********************************** Adapter invocation code end ************************************/
		
		/********************************** Lazy loading code start  ************************************/
		$scope.loadMore = function($viewScope, options) {
        	console.log("InloadMore : options" + options);
        	
        	var itemArrayKey = options.itemArrayKey;
        	if(angular.isUndefined(itemArrayKey)){
        		$viewScope[itemArrayKey] = new Array();
        		console.log("Element item-array-key is mandatory");
        	}
        	
        	var itemsToLoad = options.itemsToLoad;
        	if(itemsToLoad && !isNaN(itemsToLoad)){
        		$viewScope.itemsToLoad = parseInt(itemsToLoad);	
        	} else {
        		$viewScope.itemsToLoad = 5;
        	}
        	
        	var itemsToDisplay = options.itemsToDisplay;
        	if(itemsToDisplay && !isNaN(itemsToDisplay)){
        		$viewScope.itemsToDisplay = parseInt(itemsToDisplay);	
        	} else {
        		$viewScope.itemsToDisplay = $viewScope.itemsToLoad;
        	}
        	
        	$timeout(function() {
        		$viewScope.loadMoreItems($viewScope, options);
        	}, 1000);
        };
        
        $scope.loadMoreItems = function($viewScope, options) {
        	
        	if (options.itemsToDisplay < $viewScope[options.itemArrayKey].length) {
        		options.itemsToDisplay += options.itemsToLoad;
        		options.loadFinish = false;
        	}
        	else {
        		options.loadFinish = true;
        	}
        	
        	$viewScope.$broadcast('scroll.infiniteScrollComplete');
        };
		
		$scope.getPageNameFromURL = function(url) {
			
			if(/^(http|https):\/\//.test(url)){
				url = url.split("://")[1]
			}
			
			return $.ajax({
				url: "http://textance.herokuapp.com/title/" + url,
				dataType: "text"
			});
		};
		$scope.openExternalUrl = function(url, $event) {
			if($event) {
				 $event.stopPropagation();
			}
			
			if(!/^(http|https):\/\//.test(url)){
				url = "http://" + url;
			}
			window.open(url, "_system");
		};
		
    }]);

})();