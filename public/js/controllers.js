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
		answers: [{answer:"Yes"},{answer:"No"}]
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
	$scope.comments = [];
	$scope.commentInput = "";
	var username = 'guest';
	if($rootScope.session.currentUser !== null) {
		username = $rootScope.session.currentUser.username; 
	}

	var colors = ['#006633','#3366CC', '#33FF66', '#669933' , '#993366', '#99CC99'];

	$http.post('/api/getSinglePoll',{ pollid: $stateParams.pollid}).success(function(data) {
		$scope.poll = data;
		$scope.voteStatus = "";
		//This should be in a directive but due to time limitations its here
		var data = [];
		var i = 0;
		for(answ in $scope.poll.answers) {
			
			console.log($scope.poll.answers[answ]);
			var temp = {
				label: answ,
				value: $scope.poll.answers[answ],
				color:  colors[i]
			};
			i++;
			data.push(temp);
		}

		var ctx = document.getElementById("resultChart").getContext("2d");
		var myNewChart = new Chart(ctx).Pie(data);

	});

	$http.post('/api/getComments', { pollid: $stateParams.pollid}).success(function(data) {
		console.log(data);
		$scope.comments = data;
	});

	$scope.anwserPoll = function (an) {

		$http.put('/api/voteOnPoll/' + $stateParams.pollid, { vote: an })
		.success(function (data){
			$scope.voteStatus = data.status;
		});
	};

	$scope.addComment = function() {
		$http.post('/api/addComment', { username: username, pollid: $stateParams.pollid, comment: $scope.commentInput }).success(function(data) {
			$scope.commentInput = "";
			$scope.comments.push(data[0]);
		});
	};

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
		if($scope.messageInput != "" || $scope.messageInput.length > 1)
		{
			socket.emit('sendmessage', {username: username, message: $scope.messageInput});
			$scope.messageInput = "";	
		}
	};

}]);