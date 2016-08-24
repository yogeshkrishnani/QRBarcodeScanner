angular.module(config.appFilters).filter('currencyFormat', ['$filter', function($filter) {
    return function(input, currencyFormat) {
    	
    	input = $filter('ifNull')(input, '-');
    	
    	if(input == '-') {
    		return input;
    	}
    	else {
    		return currencyFormat + " "  + $filter('currency')(input, '');
    	}
    	
    };
}]);