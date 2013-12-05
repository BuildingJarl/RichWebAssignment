app.controller('homeController', ['$scope','$http', '$location', function($scope, $http, $location) {

	$scope.user = null;
	$scope.startGame = function() {
		$location.path("/go");
	}

	$http.get('/api/getUser').success(function(data) {
		$scope.user = data;
	});

	var ive = new IVE(300,325, document.getElementById('ThreeJS'));
	ive.addOrbitControlsToCamera();
	var of = new ObjectFactory();

	ive.addObjectToScene(of.cube(0,0,0));

	function loop() {
		ive.update();
		requestAnimationFrame(loop);
	};

	requestAnimationFrame(loop);

}]);

app.controller('goController', ['$scope','socket', '$rootScope', function($scope, socket, $rootScope) {
	console.log("Session " + $rootScope.session.currentUser);

	// user is logged in and present in rootScope#
	// do something
	if( $rootScope.session.currentUser !== null ) {

	}

	

	var ive = new IVE(window.innerWidth, window.innerHeight, document.getElementById('ThreeJSGo'));
	var of = new ObjectFactory();

	function loop() {
		ive.update();
		requestAnimationFrame(loop);
	};

	requestAnimationFrame(loop);

	window.addEventListener('resize', function() {
  		ive.resetSize(window.innerWidth,window.innerHeight);
  		console.log("resized to: " + window.innerWidth + " / "+ window.innerHeight);
	});

	//--- Socket Calls
	socket.on('init', function(data){
		console.log(data.x);
		ive.addObjectToScene(of.cube(data.x,data.y,data.z));
	});
	//http://stackoverflow.com/questions/14389049/how-to-use-angularjs-with-socket-io
	$scope.$on('$destroy', function (event) {
        socket.removeAllListeners();
    });	

}]);