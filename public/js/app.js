var app = angular.module("WikiInvaders", ['ui.router']);

app.run(['$rootScope', '$window', 'sessionService', function ($rootScope, $window,sessionService) {
	$rootScope.session = sessionService;
	$window.app = {
		authState: function(state, user) {
			console.log("auth state   " + state + " " + user);

			$rootScope.$apply(function() {
				switch (state) {
					case 'success' :
						sessionService.authSuccess(user);
						break;
					case 'falure': 
						sessionService.authFailed();
						break;
				}
			});
		}
	};

	if($window.user !== null) {
		sessionService.authSuccess($window.user);
	}

	$rootScope.$on('session-changed', function() {
		console.log("session Changed");
	})
}]);


app.config([ '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/home:homeId',
			templateUrl: "/partials/home",
			controller: function($scope, $stateParams) {
				$scope.homeId = $stateParams.homeId;
				
				} 
			})
		.state('login', {
			url: '/',
			templateUrl:'/partials/login',
			controller: function($scope,$http, $window) {

				}
			});	
}]);




