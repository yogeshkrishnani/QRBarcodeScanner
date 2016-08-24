angular.module(config.appFilters).filter('toFix', ['$filter', function($filter) {
    return function(input, precision) {
    	console.log(input);      

    	var precisionDefault = 2;
    	if(precision == undefined || isNaN(precision)){
    		precision = precisionDefault;
    	}
    		
    	if(input != null && input != undefined && !isNaN(input)){
    		input = parseFloat(input).toFixed(precision);
    	} else {
    		input = null;
    	}
    	
        return input;
    };
}]);