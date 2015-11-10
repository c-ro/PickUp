var pickUp = angular.module('pickUp', ['ui.router', 'ui.bootstrap']);

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

pickUp.factory('list', ['$http', 'alerts',
	function($http, alerts) {
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
				function(error, response){
					if (error.message) {
						console.log(error.message);
						alerts.open(error.message + " -- NAME and PRICE required.", "danger");
					} else {
						list.items.push(response);
						list.getAll();
					}
			});
		};

		list.getItem = function(id, response){
			return $http.get('/list/' + id).success(response);
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
			$http.put('/list/' + item._id, item);
			list.getAll();
		};

		return list;
}]);

pickUp.service('alerts', [
	function() {
		var alerts = [];

		alerts.open = function(msg, type) {
			alerts.push({msg: msg, type: type});
		};

		alerts.close = function(index) {
			alerts.splice(index, 1);
		};

	return alerts;
}]);

pickUp.controller('AppCtrl', ['$scope', '$http', 'list', 'alerts',
	function($scope, $http, list, alerts) {
		console.log("controller. . .");
	
	$scope.list = list.items;

	$scope.alerts = alerts;

	$scope.addItem = function(){
		console.log("add");
		list.addItem($scope.item);

		$scope.item = '';
	};

	$scope.deleteItem = function(id){
		console.log("delete");
		list.deleteItem(id);
	};

	$scope.editItem = function(item){
		list.getItem(item._id, function(response){
			$scope.item = response;
		});
	};

	$scope.updateItem = function(){
		console.log("update");
		list.updateItem($scope.item);
		$scope.item = '';
	};

	$scope.closeAlert = function(index){
		alerts.close(index);
	};

}]);