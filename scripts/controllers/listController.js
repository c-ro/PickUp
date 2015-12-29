 angular.module('pickUp')
 .controller('ListCtrl', ['$scope', '$http', 'ngDialog', 'list', 'items',
	function($scope, $http, ngDialog, list, items) {
	$scope.list = list.list;
	$scope.newItems = items.items;

	$scope.addToListDialog = function(currentList){
		ngDialog.open({
			template: 'views/add-to-list-dialog.html',
			scope: $scope,
			data: { list: currentList }
		});
	};

	$scope.addToList = function(item){
		list.addItemToList(item, function(res){
			console.log("add to list");
		});
	};

	$scope.removeItemFromList = function(item){
		list.removeItemFromList(item, function(res){
			console.log("remove from list");
		});
	};

	// View Modes Logic

	$scope.currentMode = 0;
	$scope.viewMode = ["both", "list", "cart"];

	$scope.nextMode = function(){
		if($scope.currentMode === 2){
			$scope.currentMode = 0;
		} else {
			$scope.currentMode += 1;
		}
	};

	$scope.mode = function(item){
		if($scope.viewMode[$scope.currentMode] === 'cart' && $scope.inCart(item)){
			return true;
		}

		if($scope.viewMode[$scope.currentMode] === 'both'){
			return true;
		}

		if($scope.viewMode[$scope.currentMode] === 'list' && !$scope.inCart(item)){
			return true;
		}
	};

	// Cart Logic 
	$scope.cart = [];

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