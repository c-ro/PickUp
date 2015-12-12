angular.module('pickUp').factory('lists', ['$http',
	function($http){

		var lists = {
			lists: []
		};

		lists.getAll = function(){
			console.log("trying. . .");
			$http.get('/lists').success(function(res){
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
						items.items.push(response);
						items.getAll();
					}
			});
		};

		return lists;
}]);