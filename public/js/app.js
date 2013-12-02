var app = angular.module("Seed", []);

app.config([ '$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'partials/template',
		controller: 'SeedController'
	}).
	otherwise({
		redirectTo: '/'
	});
	$locationProvider.html5Mode(true);
}]);




