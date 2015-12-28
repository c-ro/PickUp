angular.module('pickUp').factory('lists', ['$http', 'alerts',
	function($http, alerts){
		var lists = {
			lists: []
		};

		lists.getAll = function(){
			$http.get('/lists').success(function(res){
				console.log("get all lists");
				angular.copy(res, lists.lists);
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
			$http.delete('/lists/' + list).success(
				function(res){
					lists.getAll();
				}
			);
		};

		return lists;
}]);