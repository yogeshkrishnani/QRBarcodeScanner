angular.module(config.appDirectives).directive('popoverClose',['$timeout' , function($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
    		$(element).click(function() {
    			scope.closePopover();
    		});
        }
    };
}]);