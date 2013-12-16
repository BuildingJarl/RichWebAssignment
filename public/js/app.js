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
			onEnter: function($stateParams,$http) {
				console.log($stateParams.pollid);
				$http.put('/api/viewPoll/' + $stateParams.pollid)
					.success(function (data) {
				});
			},
			controller:'singlePollController'
		})
		.state('create', {
			url:'/create',
			templateUrl:'/partials/create',
			controller:'createController'
		})
		.state('chat', {
			url:'/chat',
			templateUrl: '/partials/chat',
			controller: 'chatController'
		});

}]);


app.run(['$rootScope', '$window','sessionService', '$state', function ($rootScope, $window, sessionService, $state) {
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

	$rootScope.$on('session-changed', function() {
		$state.go('index');
	});
}]);






