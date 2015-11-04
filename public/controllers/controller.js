var pickUp = angular.module('pickUp', []);

pickUp.controller('AppCtrl',['$scope', '$http',
	function($scope, $http) {
		console.log("Sup, I'm the app controller.");

	var refresh = function() {
		$http.get('/list').success(function(res){
			console.log("got data. . .");
			$scope.list = res;
			$scope.items = '';
		});
	};

	refresh();

	$scope.addItem = function(){
		console.log($scope.item);
		$http.post('/list', $scope.item).success(
			function(response){
				console.log(response);
				refresh();
			}
		);
	};

	$scope.deleteItem = function(item){
		console.log(item);
		$http.delete('/list/' + item).success(
			function(res){
				refresh();
			}
		);
	};

	$scope.editItem = function(item){
		console.log("editing: " + item);
		$http.get('/list/' + item).success(
			function(response){
				$scope.item = response;
			}
		);
	};

	$scope.updateItem = function(){
		$http.put('/list/' + $scope.item._id, $scope.item).success(
			function(res){
				refresh();
				$scope.item = '';
			});
	};

}]);