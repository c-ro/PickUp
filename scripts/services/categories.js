angular.module('pickUp')
.factory('categories', [
	function() {
		var categories = ["meat", "produce", "frozen", "beverages", "dryandcanned", "personal", "home", "pets", "bakery"];

		return categories;
}]);