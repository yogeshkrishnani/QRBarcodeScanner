(function() {
    'use strict';
    
    angular.module(config.appDirectives).directive('hideOnKeyboardOpen',['$timeout' , function($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
            	
            	console.log("hideOnKeyboardOpen Register");
            	
            	var addKeyboardOpenClass = function() {
            		console.log("Adding keyboard-open class on body");
            		document.body.classList.add('keyboard-open');
            	};
            	
            	$(element).addClass('hide-on-keyboard-open');
            	
            	window.addEventListener('native.keyboardshow', addKeyboardOpenClass, true);
            	
            	scope.$on('$ionicView.beforeLeave', function () {
            		window.removeEventListener('native.keyboardshow', addKeyboardOpenClass, true);
        		});
            }
        };
    }]);
    
})();    
