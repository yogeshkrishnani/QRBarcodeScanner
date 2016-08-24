 angular.module(config.appFilters).filter('phnNoFormat', ['$filter', function($filter) {
    return function(input, countryCode) {
    	console.log(input);      
    	
    	 if( !angular.isString(input) ) {
    		 input = new String(input);
    	 }
    	 
    	 if(input.length < 9) {
    		 input = input.fill(0, 9 - input.length);
    	 }
    	 
    	 return "+" + countryCode + " " + input.substr(0,3) + "-" + input.substr(3,3) + "-" + input.substr(6,3);
    };
}]);