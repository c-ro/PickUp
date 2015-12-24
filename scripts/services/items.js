angular.module('pickUp').factory('items', ['$http', 'alerts',
	function($http, alerts) {
		var items = {
			items: []
		};

		items.getAll = function() {
			$http.get('/items').success(function(res){
				angular.copy(res, items.items);
			});
		};

		items.addItem = function(item){
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
			});
		};

		items.deleteItem = function (item){
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