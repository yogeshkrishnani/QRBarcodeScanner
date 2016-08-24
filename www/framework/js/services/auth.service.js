// Authentication service
angular.module(config.appServices).factory('Auth', function() {
    var user = {};
    
    var authFactory = {};

    authFactory.loginUser = function() {
        user.isLoggedIn = true;
    };
    authFactory.logoutUser = function() {
        user = {
        	isLoggedIn : false	
        };
    };
    authFactory.isUserLoggedIn = function() {
        return user.isLoggedIn;
    };
    
    return authFactory;
});
    