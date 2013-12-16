app.controller('indexController', ['$rootScope','$scope','$http', '$state', function($rootScope,$scope, $http, $state) {

	$scope.polls = [];

	$http.get('/api/getIndexPolls').success(function(data){
		$scope.polls = data;
	});

}]);

app.controller('createController', ['$rootScope','$scope','$http', '$state', function($rootScope,$scope, $http, $state) {

	$scope.poll = {
		title: "",
		info: "",
		answers: [{answer:"yes"},{answer:"no"}]
	};

	$scope.addAnswer = function () {
		if($scope.poll.answers.length < 6) {
			$scope.poll.answers.push({answer:""});
		}
	};
	$scope.removeAnswer = function(index) {
		$scope.poll.answers.splice(index,1)
	};

	$scope.createPoll = function () {
		//send to server to parse and insert into database
		$http.post('/api/createPoll',$scope.poll).success( function (data) {
			$state.go('poll', { pollid: data.pollid });
		});
	};

}]);

app.controller('pollsController', ['$rootScope','$scope','$http', '$state', '$stateParams', function($rootScope,$scope, $http, $state, $stateParams) {

	$scope.polls = [];
	$http.get('/api/getPolls').success(function(data){
		$scope.polls = data;
	});

}]);

app.controller('singlePollController', ['$rootScope','$scope','$http', '$state', '$stateParams', function($rootScope,$scope, $http, $state, $stateParams) {
	$scope.poll = {};
	$http.post('/api/getSinglePoll',{pollid: $stateParams.pollid}).success(function(data) {
		$scope.poll = data;
	});

	$scope.anwserPoll = function (an) {

		$http.put('/api/voteOnPoll/' + $stateParams.pollid, { vote: an })
		.success(function (data){
			console.log(data);
		});
	}

}]);

app.controller('chatController', ['$rootScope','$scope','$http', '$state', '$stateParams', function($rootScope,$scope, $http, $state, $stateParams) {
	var socket = io.connect();
	$scope.messages = [];
	var username = "guest";
	$scope.messageInput = "";

	if($rootScope.session.isLoggedIn) {
		username = $rootScope.session.currentUser.username;
	}

	socket.on('message', function (data) {
		if(data) {
			$scope.$apply($scope.messages.push(data));
			
			console.log($scope.messages);
		}
	});
	
	$scope.sendMessage = function() {
		socket.emit('sendmessage', {username: username, message: $scope.messageInput});
		$scope.messageInput = "";	
	};

}]);