var app = angular.module("Pollnoid", ['ui.bootstrap','ui.router']);

app.config([ '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('index', {
			url:'/',
			templateUrl:'partials/index',
			controller: 'indexController'
		})
		.state('login', {
			url: '/login',
			templateUrl:'/partials/login'
		})
		.state('signup', {
			url:'/login',
			templateUrl:'/partials/login'
		})
		.state('polls', {
			url:'/polls',
			templateUrl:'/partials/polls',
			controller:'pollsController'
		})
		.state('poll', {
			url:'/poll/:pollid',
			templateUrl:'/partials/poll',
			controller:'singlePollController'
		})
		.state('create', {
			url:'/create',
			templateUrl:'/partials/create',
			controller:'createController'
		});

}]);


app.run(['$rootScope', '$window','sessionService', function ($rootScope, $window,sessionService) {
	//attatch session service to rootscope
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






