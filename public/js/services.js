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
				console.log("authSuccess called");
				this.currentUser = userData;
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

app.factory('socket', function ($rootScope) {
	var socket = io.connect();  //in server on connect
	return {
		on: function (eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function () {
					callback.apply(socket, args);
				});
			});
		},
		emit: function (eventName, data, callback) {
			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.$apply( function() {
					if(callback) {
						callback.apply(socket, args);
					}
				});
			})
		}
	}
});