var app = angular.module("WikiInvaders", ['ui.bootstrap','ui.router']);

app.config([ '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('login', {
			url: '/',
			templateUrl:'/partials/login',
			controller: function($scope) {

				}
			})
		.state('home', {
			url: '/home',
			templateUrl: "/partials/home",
			controller: function($scope,sessionService) {
					$scope.hello = "helloworld";
					$scope.user = sessionService.currentUser;
					console.log($scope.user);
				} 
			});	
}]);


app.run(['$rootScope', '$window', '$location' ,'sessionService', function ($rootScope, $window, $location,sessionService) {
	$rootScope.session = sessionService;
	$window.app = {
		authState: function(state, user) {
			$rootScope.$apply(function() {
				switch (state) {
					case 'success' :
						sessionService.authSuccess(user);
						break;
					case 'failure': 
						sessionService.authFailed();
						break;
				}
			});
		}
	};

	if($window.user !== null) {
		sessionService.authSuccess($window.user);
		//console.log($window.user);
		//$location.path("/home");
	}

	$rootScope.$on('session-changed', function() {
		console.log("Session Changed");

		if(sessionService.isLoggedIn) {
			$location.path("/home");
		} else {
			$location.path("/");
		}
	})
}]);






