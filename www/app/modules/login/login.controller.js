
lScope = "";
translate = "";

(function() {
	'use strict';

	angular.module('app.login').controller('LoginCtrl', LoginController);

	function LoginController($scope, $ionicScrollDelegate, $state, Auth, $translate, $ionicPlatform) {
		
		lScope = $scope;
		translate = $translate;
		
		$scope.hideHeaderBarForCurrentView($scope);
		
		$("#languageOptn").unbind("change").change(function() {
			var preferredLang = $(this).val();
			$scope.changeLanguage(preferredLang);
		});
		
		$scope.googlePlusAvailable = false;
		
	  	$('#password').keypress(function(e) {
	  	    if (e.which == '13') {
	  	    	$scope.authenticateUser();
	  	    }
	  	});

		$scope.authenticateUser = function() {
			
			var userId = $("#username").val();
			var password = $("#password").val();

			if (userId.trim() == "" || password.trim() == "") {
				$scope.showAlert($scope.getMessage("loginFailTitle"), $scope.getMessage("invalidUsernamePasswordMessage"));
				return;
			}
			
			$scope.showLoadingIndicator($scope.getMessage("loggingInMessage"));

			var param = {
				userId : userId,
				password : password,
			};

			$scope.authenticationService(param, function(response) {
				$scope.loginSuccess(response, param);
			}, function(response) {
				$scope.hideLoadingIndicator();
				$scope.showadapterFailMessage(response);
			});
			
		};
		
		$scope.loginSuccess = function(loginResponse) {
			if(loginResponse.responseJSON.status == 200) {
				WL.Logger.info("Login Success! " + JSON.stringify(loginResponse));
				Auth.loginUser(); 
				$scope.hideLoadingIndicator();
				$state.go('app.view.dashboard');
			}
			else {
				$scope.loginFailure(loginResponse);
			}
		};
		
		$scope.loginFailure = function(response) {
			WL.Logger.info("Login Failure! " + JSON.stringify(response));
			$scope.hideLoadingIndicator();
			$scope.showAlert($scope.getMessage("loginFailTitle"),$scope.getMessage("invalidUsernamePasswordMessage"));
		};
		
		$ionicPlatform.ready(function() {
			googlePluAuth.isAvailable(function(available) {
				if (available == "true") {
					$("#signInWithGoogleBtn").removeClass("hidden");
				}
			});
		});
		
		$scope.signInWithGoogle = function() {
			
			$scope.showLoadingIndicator("Logging in... Please wait...!");
			
			var signInSuccess = function(userDetails) {
				WL.Toast.show("Welcome " + userDetails.email);
				Auth.loginUser();
				setTimeout(function() {
					$scope.hideLoadingIndicator();
					$state.go('app.view.dashboard');
				}, 500);
			};
			
			var signInError = function() {
				$scope.showAlert($scope.getMessage("loginFailTitle"), "Google Sign In Failed!!!!");
				$scope.hideLoadingIndicator();
			};
			
			googlePluAuth.login(signInSuccess, signInError);
		};
		
		$("#username").val("tester");
		$("#password").val("password");

	}
})();