app.controller('homeController', ['$scope','$http', '$state', function($scope, $http, $state) {
	
	var ive = new IVE(300,325, document.getElementById('ThreeJS'));
	ive.addOrbitControlsToCamera();

	$scope.user = null;
	$scope.startGame = function() {
		$state.go("go");
	}

	$http.get('/api/getUser').success(function(data) {
		$scope.user = data;
		ive.addModelToScene($scope.user.model.name);
	});

	

	function loop() {
		ive.update();
		requestAnimationFrame(loop);
	};

	requestAnimationFrame(loop);

}]);

app.controller('goController', ['$scope', '$rootScope', function($scope, $rootScope) {
	var socket = io.connect();
	var ive = new IVE(window.innerWidth, window.innerHeight, document.getElementById('ThreeJSGo'));
	var playerModel = "blimp";

	window.addEventListener('resize', function() {
  		ive.resetSize(window.innerWidth,window.innerHeight);
	});

	if( $rootScope.session.currentUser !== null ) {
		//var playerModel = user.model;
	} 

	//--- Socket Calls
	socket.on('connect', function(data){
		console.log("Successfully connected with server");
		ive.addModelToScene(playerModel);
	});

	$scope.$on('$destroy', function () {
		console.log("controller Destoryed");
		socket.emit("playerDisconnected", {data:"ueea"});
	});

	// Game loop
	function loop() {
		ive.update();
		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
}]);