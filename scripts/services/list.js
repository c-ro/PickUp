angular.module('pickUp').factory('list', ['$http',
	function($http){
		var list = {
			list: {}
		};

		list.getList = function(id){
			$http.get('/lists/' + id).success(function(res){
				angular.copy(res, list.list);
			});
		};

		list.addItemToList = function(item){
			$http.put('/lists/add/' + list.list._id, item).success(
				function(res){
					console.log(res);
					list.getList(list.list._id);
				});
		};

		list.removeItemFromList = function(item){
			console.log(item);
			$http.put('/list/remove/' + list.list._id + '/' + item._id).success(
				function(res){
					console.log(res);
					list.getList(list.list._id);
			});
		};
		
		return list;
}]);