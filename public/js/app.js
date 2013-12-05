var app = angular.module("WikiInvaders", ['ui.bootstrap','ui.router']);

app.config([ '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('login', {
			url: '/',
			templateUrl:'/partials/login'
		})
		.state('home', {
			url: '/home',
			templateUrl: "/partials/home",
			controller: 'homeController'
		})
		.state('go', {
			url:'/go',
			templateUrl:"partials/go",
			controller: "goController"
		});	
}]);

app.run(['$rootScope', '$window', '$state' ,'sessionService', function ($rootScope, $window, $state,sessionService) {
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

	if($window.user !== null && $window.user !== undefined) {
		sessionService.authSuccess($window.user);
	}

	$rootScope.$on('session-changed', function() {
		if(sessionService.isLoggedIn) {
			$state.go('home'); 
		} else {
			$state.go('login');
		}
	})
}]);






