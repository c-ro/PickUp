angular.module('pickUp').factory('lists', ['$http', 'alerts',
	function($http, alerts){
		var lists = {
			lists: []
		};

		lists.getAll = function(){
			return $http.get('/lists').success(function(res){
				angular.copy(res, lists.lists);
			});
		};

		lists.getList = function(id){
			return $http.get('/lists/' + id).then(function(res){
				return res.data;
			});
		};

		lists.addList = function(list){
			$http.post('/lists', list).success(
				function(error, response){
					if (error.message) {
						console.log(error.errors);
						alerts.open(error.errors);
					} else {
						lists.lists.push(response);
						lists.getAll();
					}
			});
		};

		lists.deleteList = function (list){
			$http.delete('/lists/' + list).then(
				function(res){
					lists.getAll();
				}
			);
		};

		lists.addItemToList = function(item, list){
			$http.put('/lists/add/' + list, item).success(
				function(data, res){
					if(data){
						console.log("data:", data);
					} else {
						lists.getAll();
					}
				});
		};

		lists.removeItemFromList = function(item, list){
			$http.put('/list/remove/' + list._id + '/' + item._id).success(
				function(res){
						console.log(res);
						lists.getAll();
					// if(err){
					// 	console.log(err);
					// } else {
					// 	console.log(res);
					// 	lists.getAll();
					// }
				});
		};


		return lists;
}]);