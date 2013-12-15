app.controller('indexController', ['$rootScope','$scope','$http', '$state', function($rootScope,$scope, $http, $state) {

	$scope.polls = [];

	$http.get('/api/getIndexPolls').success(function(data){
			$scope.polls = data;
	});

}]);

app.controller('createController', ['$rootScope','$scope','$http', '$state', function($rootScope,$scope, $http, $state) {

	$scope.optionInput = "";

	$scope.poll = {
		title: "",
		info: "",
		options: ["Yes","No"]
	};

	$scope.addOption = function () {
		if($scope.optionInput.length > 1 && $scope.optionInput !== "") {
			$scope.poll.options.push($scope.optionInput);
		}
	};

	$scope.editOption = function() {

	}

	$scope.removeOption = function(index) {
		$scope.poll.options.splice(index,1)
	}


	$scope.createPoll = function () {
		//send to server to parse and insert into database
		$http.post('/api/createPoll',$scope.poll).success( function (data) {
			$state.go('poll', { pollid: data });
		});
	};

}]);


app.controller('singlePollController', ['$rootScope','$scope','$http', '$state', '$stateParams', function($rootScope,$scope, $http, $state, $stateParams) {

	console.log($stateParams.pollid);
	//get all poll details from db
}]);