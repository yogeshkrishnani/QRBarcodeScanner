angular.module(config.appFilters).filter('ifNull', function() {
    return function(input, defaultValue) {

    	if (angular.isUndefined(input) || input === null || (typeof input=="string" && input.toLowerCase() === "null")) {
            return defaultValue;
        }

        return input;
    };
});

