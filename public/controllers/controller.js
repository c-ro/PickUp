var pickUp = angular.module('pickUp', ['ui.router']);

pickUp.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider.state('/', {
			url: '/',
			templateUrl: 'views/list.html',
			controller: 'AppCtrl',
			resolve: {
				itemPromise: ['list', function (list){
					return list.getAll();
				}]
			}
		});

		$urlRouterProvider.otherwise('/');

}]);

pickUp.factory('list', ['$http',
	function($http) {
		var list = {
			items: []
		};

		list.getAll = function() {
			$http.get('/list').success(function(res){
				console.log("got data from mongo. . .");
				angular.copy(res, list.items);
			});
		};

		list.addItem = function(item){
			$http.post('/list', item).success(
				function(response){
					console.log(response._id);
					list.items.push(response);
				}
			);
		};

		list.deleteItem = function (item){
			console.log(item);
			$http.delete('/list/' + item).success(
				function(res){
					list.getAll();
				}
			);
		};

		list.updateItem = function(item){
			console.log(item._id);
			// $http.put('/list/' + item._id, item).success(
			// 	function(res){
			// 		list.getAll();
			// });
		};

		return list;
}]);

pickUp.controller('AppCtrl',['$scope', '$http', 'list',
	function($scope, $http, list) {
		console.log("controller. . .");
	
	$scope.list = list.items;

	$scope.addItem = function(){
		list.addItem($scope.item);
		$scope.item = '';
	};

	$scope.deleteItem = function(id){
		list.deleteItem(id);
	};

	$scope.editItem = function(item){
		console.log("editing: " + item);
		$http.get('/list/' + item).success(
			function(response){
				if ($scope.item === undefined) {
					$scope.item = response;
				} else {
					$scope.item = '';
				};

			}
		);
	};

	$scope.updateItem = function (){
		list.updateItem($scope.item);
		$scope.item = '';
	};


}]);