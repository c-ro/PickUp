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
				console.log("factory get list:", res.data);
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
			console.log("add %s to %s. . .", item, list);
			$http.put('/lists/add/' + list, item).success(
				function(err, res){
					if(err){
						console.log(err);
					} else {
						console.log(res);
						lists.getAll();
					}
				});
		};

		return lists;
}]);