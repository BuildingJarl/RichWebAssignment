app.factory('sessionService', ['$rootScope', '$window', '$http', 
	function($rootScope, $window, $http) {
		var session = {
			init: function() {
				this.resetSession();
			},
			resetSession: function() {
				this.currentUser = null;
				this.isLoggedIn = false;
			},
			facebookLogin: function() {
				var url = '/auth/facebook';
				var width = 1000;
				var height = 650;
				var top = (window.outerHeight - height) / 2;
				var left = (window.outerWidth - width) / 2;

				var features = "width=" + width + ",height=" + height + ",scrollbars=0,top=" + top;
				$window.open(url, 'facebook_login', features);
			},
			logout: function() {
				var scope = this;
				$http.delete('/auth').success(function() {
					scope.resetSession();
					$rootScope.$emit('session-changed');
				});
			},
			authSuccess: function(userData) {
				
				var self = this;

				//this.currentUser = userData;

				$http.get('/api/getUser',{user:userData}).success(function (data) {
					self.currentUser = data;
				});

				this.isLoggedIn = true;
				$rootScope.$emit('session-changed');
			},
			authFailed: function() {
				this.resetSession();
				alert('Authentication Failed, your browser will now explode');
			}
		};
		session.init();
		return session;
}]);