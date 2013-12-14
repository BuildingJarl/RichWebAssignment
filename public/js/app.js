var app = angular.module("Pollnoid", ['ui.bootstrap','ui.router']);

app.config([ '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('index', {
			url:'/',
			templateUrl:'partials/index'
		})
		.state('login', {
			url: '/login',
			templateUrl:'/partials/login'
		})
		.state('signup', {
			url:'/login',
			templateUrl:'/partials/login'
		});
}]);





app.run(['$rootScope', '$window','sessionService', function ($rootScope, $window,sessionService) {
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
}]);






