 angular.module('pickUp').controller('ListsCtrl', ['$scope', '$http', 'ngDialog', 'lists', 'alerts',
	function($scope, $http, ngDialog, lists, alerts) {
	$scope.lists = lists.lists;

	$scope.addList = function(){
		lists.addList($scope.list);

		ngDialog.closeAll();
		$scope.list = '';
	};

	$scope.deleteList = function(list){
		if(confirm("you sure?")){
			lists.deleteList(list._id);
		} else {
			lists.getAll();
		}
	};

	$scope.newListDialog = function() {
		$scope.list = {};

		ngDialog.openConfirm({
			template: 'views/newListDialog.html',
			scope: $scope
		});
		// .then(function(res){
		// 	console.log(res);
		// });
	};

}]);