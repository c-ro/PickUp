angular.module('pickUp').factory('list', ['$http', 'alerts',
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
			// console.log("service: " + JSON.stringify(item));
			$http.post('/list', item).success(
				function(error, response){
					if (error.message) {
						console.log(error.errors);
						alerts.open(error.errors);
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
			$http.put('/list/' + item._id, item);
			list.getAll();
		};

		list.purchaseItem = function(item){
			$http.put('/list/purchase/' + item._id, item);
			list.getAll();
		};

		list.deletePurchase = function (item){
			$http.put('/purchase/remove/' + item._id + '/' + item.date).success(
				function(res){
					list.getAll();
				}
			);
		};

		return list;
}]);