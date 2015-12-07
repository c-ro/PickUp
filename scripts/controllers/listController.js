 angular.module('pickUp')

.controller('AppCtrl', ['$scope', '$http', 'ngDialog', 'list', 'alerts',

	function($scope, $http, ngDialog, list, alerts) {

	$scope.list = list.items;

	$scope.alerts = alerts;

	$scope.listTotal = function(arr){
		var sum = 0;

		for(var i = 0; i < arr.length; i++){
			sum = sum + (arr[i].price * arr[i].qty);
		}
		
		return sum;
	};

	$scope.addItem = function(){
		list.addItem($scope.item);

		ngDialog.closeAll();
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

	$scope.editDialog = function (item) {
		var newScope = $scope.$new();
			newScope.item = item;
		
		ngDialog.openConfirm({
			template: 'views/edit-dialog.html',
			scope: newScope
		}).then(function(res){
			if(res){
				list.updateItem(item);
			}
		});
	};

	$scope.inputDialog = function() {
		$scope.item = {};

		ngDialog.openConfirm({
			template: 'views/input-dialog.html',
			scope: $scope
		});
		// .then(function(res){
		// 	console.log(res);
		// });
	};

	$scope.purchaseItem = function(item){
		console.log("purchase");

		var doc = {
			_id: item._id,
				qty: item.qty,
				price: item.price,
			//store
		};

		list.purchaseItem(doc);
	};

	$scope.deletePurchase = function(item, date){
		var purchase = {
			_id: item,
			date: date
		};

		list.deletePurchase(purchase);
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