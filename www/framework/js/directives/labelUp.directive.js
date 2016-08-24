angular.module(config.appDirectives).directive('labelUp',['$timeout' , function($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
        	$(element).bind("change", function() {
        		var inputValue = $(this).val();
        		if(inputValue == "" || inputValue == null || inputValue == -1) {
        			$(this).siblings("label").removeClass("labelUp");
        		}
        		else {
        			$(this).siblings("label").addClass("labelUp");
        		}
        	});
        }
    };
}]);