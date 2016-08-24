angular.module(config.appFilters).filter('percentage', ['$filter', function($filter) {
    return function(input, total, defaultVal) {

    	if(angular.isUndefined(defaultVal) ||  isNaN(defaultVal)){
    		defaultVal = 0;
    	}
	
    	input = $filter('ifNull')(input, 0);
    	total = $filter('ifNull')(total, 0);
    	if(isNaN(total) || isNaN(input)  ||total == 0){
    		return defaultVal;
    	} else {
    		return Math.round( input * 100 / total );
    	}
    };
}]);