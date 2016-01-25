 angular.module('pickUp')
 .controller('ListCtrl', ['$scope', '$http', '$rootScope', '$timeout', 'ngDialog', 'list', 'items', 'categories',
	
	function($scope, $http, $rootScope, $timeout, ngDialog, list, items, categories) {
	
	$scope.list = list.list;
	$scope.item = {};
	$scope.newItems = items.items;
	$scope.categories = categories;
	$scope.dialog = false;
	
	// CRUDing logic
	$scope.addToListDialog = function(currentList){
		ngDialog.open({
			template: 'views/add-to-list-dialog.html',
			scope: $scope
		});
	};

	$scope.addToList = function(item){
		list.addItemToList(item, function(res){
		});
	};

	$scope.removeItemFromList = function(item){
		list.removeItemFromList(item, function(res){
		});
	};

	$scope.addItem = function(input){
		items.addItem(input);
		this.closeThisDialog();
		$scope.item = {};
	};

	$scope.addSingleItem = function() {
		ngDialog.open({
			template: 'views/input-dialog.html',
			scope: $scope
		});
	};

// ITEM DIRECTIVE action toggles
	$rootScope.$on('ngDialog.opened', function (e, $dialog) {
		$scope.dialog = true;
	});

	$rootScope.$on('ngDialog.closing', function (e, $dialog) {
		if ($dialog[0].id.indexOf('ngdialog') > -1) {
				$scope.dialog = false;
				$scope.$apply();
		}
	});


	// Sort/Filter Logic

	$scope.sortType = 'price * qty';
	$scope.sortReverse = false;
	$scope.sortSearch = '';

	// View Modes Logic
	$scope.currentMode = 0;
	$scope.viewMode = ["all", "cart", "list"];

	$scope.nextMode = function(){
		if($scope.currentMode === 2){
			$scope.currentMode = 0;
		} else {
			$scope.currentMode += 1;
		}
	};

	$scope.mode = function(item){
		if($scope.viewMode[$scope.currentMode] === 'all'){ return true; }

		if($scope.viewMode[$scope.currentMode] === 'cart' && $scope.inCart(item)){ return true; }

		if($scope.viewMode[$scope.currentMode] === 'list' && !$scope.inCart(item)){ return true; }
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