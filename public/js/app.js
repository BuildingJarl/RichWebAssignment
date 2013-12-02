var app = angular.module("WikiInvaders", ['ui.router']);

app.config([ '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("/login");

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: "partials/login"
		})
		.state('profile', {
			url: '/profile',
			templateUrl: "partials/profile"
		});
}]);




