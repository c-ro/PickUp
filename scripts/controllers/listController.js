 angular.module('pickUp')

.controller('AppCtrl', ['$scope', '$http', 'ngDialog', 'list', 'alerts',

	function($scope, $http, ngDialog, list, alerts) {

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

	$scope.inputDialog = function (item) {
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

}]);