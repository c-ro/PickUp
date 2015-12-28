angular.module('pickUp')
.controller('ItemsCtrl', ['$scope', '$http', '$filter', 'ngDialog', 'items', 'alerts', 'lists',

	function($scope, $http, $filter, ngDialog, items, alerts, lists) {

	$scope.alerts = alerts;
	$scope.items = items.items;

	var orderBy = $filter('orderBy');

	// $scope.listTotal = function(arr){
	// 	var sum = 0;

	// 	for(var i = 0; i < arr.length; i++){
	// 		sum = sum + (arr[i].price * arr[i].qty);
	// 	}
		
	// 	return sum;
	// };

	$scope.addItem = function(){
		items.addItem($scope.item);

		ngDialog.closeAll();
		$scope.item = '';
	};

	$scope.deleteItem = function(id){
		if(confirm("you sure?")){
			console.log("delete");
			items.deleteItem(id);
		} else {
			items.getAll();
		}
	};

	$scope.editItem = function(item){
		items.getItem(item._id, function(response){
			$scope.item = response;
		});
	};

	$scope.updateItem = function(){
		console.log("update");
		items.updateItem($scope.item);
		$scope.item = '';
	};

	$scope.closeAlert = function(index){
		alerts.close(index);
	};

	$scope.editDialog = function (item) {
		var newScope = $scope.$new();
			newScope.item = item;
		
		ngDialog.openConfirm({
			template: 'views/edit-dialog.html',
			scope: newScope
		}).then(function(res){
			if(res){
				items.updateItem(item);
			}
		});
	};

	$scope.inputDialog = function() {
		$scope.item = {};

		ngDialog.openConfirm({
			template: 'views/input-dialog.html',
			scope: $scope
		});
	};

	$scope.purchaseItem = function(item){
		var doc = {
			_id: item._id,
				qty: item.qty,
				price: item.price,
				//store: item.store << not currently in model
		};
		items.purchaseItem(doc);
	};

	$scope.deletePurchase = function(item, date){
		var purchase = {
			_id: item,
			date: date
		};

		items.deletePurchase(purchase);
	};

	$scope.cart = [];
	$scope.hideCart = true;

	$scope.toggleCart = function (item){
		var index = $scope.cart.indexOf(item);
		if(index === -1){
			$scope.cart.push(item);
		} else {
			$scope.cart.splice(index, 1);
		}
		$scope.$apply();
	};

	$scope.inCart = function (item) {
		return $scope.cart.indexOf(item) > -1;
	};

}]);