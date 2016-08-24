
/* 
 * Native Page Transition Service.
 * Dependencies : Cordova plugin nativeTransition
 * How to use : Inject the service NativePageTransition in controller.
 * Author : Yogesh Krishnani
 * Version : 1.0 
 */

(function() {
    'use strict';

    angular.module(config.appServices).service('NativePageTransition', function($state, $ionicHistory) {

    	/*
    	 * showNextPage --
    	 * Description : go to next page using native page transition.
    	 * @param view : 
    	 */
        this.showNextPage = function(data, options, callback) {

            var nextScreenGlobalOpt = {
                direction: 'left'
            };
            
            var transitionType = config.getPageTransitionType();

            options = $.extend({}, nextScreenGlobalOpt, options);

            window.plugins.NativePageTransitionPlugin[transitionType](options, function(response) {

                console.log("Page Transition Success: " + response);

                if (typeof callback == "function")
                    callback();

            }, function(response) {

            	console.log("Page Transition Error : " + response);
            	
                if (typeof callback == "function")
                    callback();
            });

        };

        this.showPrevPage = function(data, options, callback) {

            var prevScreenGlobalOpt = {
                direction: 'right'
            };
            var transitionType = config.getPageTransitionType();

            options = $.extend({}, prevScreenGlobalOpt, options);

            window.plugins.NativePageTransitionPlugin[transitionType](options, function(response) {

                console.log("Page Transition Success: " + response);

                if (typeof callback == "function")
                    callback();

            }, function(response) {

            	console.log("Page Transition Error : " + response);

                if (typeof callback == "function")
                    callback();
            });

        };

    });

})();
