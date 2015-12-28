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

}]);