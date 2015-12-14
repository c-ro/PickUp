angular.module('pickUp').factory('items', ['$http', 'alerts',
	function($http, alerts) {
		var items = {
			items: []
		};

		items.getAll = function() {
			$http.get('/items').success(function(res){
				console.log("got data from mongo. . .");
				angular.copy(res, items.items);
			});
		};

		items.addItem = function(item){
			// console.log("service: " + JSON.stringify(item));
			$http.post('/items', item).success(
				function(error, response){
					if (error.message) {
						console.log(error.errors);
						alerts.open(error.errors);
					} else {
						items.items.push(response);
						items.getAll();
					}
			});
		};

		items.getItem = function(id, response){
			$http.get('/items/' + id).success(function(response){
				console.log(response);
			});
		};

		items.deleteItem = function (item){
			console.log(item);
			$http.delete('/items/' + item).success(
				function(res){
					items.getAll();
				}
			);
		};

		items.updateItem = function(item){
			$http.put('/items/' + item._id, item);
			items.getAll();
		};

		items.purchaseItem = function(item){
			$http.put('/items/purchase/' + item._id, item);
			items.getAll();
		};

		items.deletePurchase = function (item){
			$http.put('/purchase/remove/' + item._id + '/' + item.date).success(
				function(res){
					items.getAll();
				}
			);
		};

		return items;
}]);