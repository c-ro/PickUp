angular.module('pickUp')
.directive('item', ['$animate', function($animate){
	
	var itemFunc = function(scope, element, attrs){
		var crossout = angular.element(element.children()[0]);
		var row = angular.element(element.children());
		var itemName = angular.element(element.children()[1]);
		var itemSubtotal = angular.element(element.children()[2]);
		var itemActions = angular.element(element.children()[3]);
		var content = [itemName, itemSubtotal, itemActions];

		var strikeOut = function(){
			itemName.toggleClass('strikeout');
			for(var i = 1; i < content.length; i++){
				content[i].toggleClass('strikeout');
			}
			//add to cart
			scope.toggleCart(scope.item);

		};

		$(crossout).on('click', strikeOut);

		var hide = function() {
			console.log("hide");
			$(row).hide();
		};

		$(itemActions).on('click', hide);


	};

	var directive = {
		restrict: 'EA',
		scope: "=name",
		templateUrl: 'views/itemDirective.html',
		link: itemFunc
	};

	return directive;

}]);