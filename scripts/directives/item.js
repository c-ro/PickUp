angular.module('pickUp')
.directive('item', [function(){
	
	var itemFunc = function(scope, element, attrs){
		/// I hate these, there has to be a better way of doing this.
		var crossout = angular.element(element.children()[0]);
		var row = angular.element(element.children());
		var itemName = angular.element(element.children()[1]);
		var itemSubtotal = angular.element(element.children()[2]);
		var removeAction = angular.element(element.children()[4]);
		/// add?  not always in DOM
		var itemActions = angular.element(element.children()[5]);
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

		// this function highlights selected items in intermediary list
		$(itemActions).click(function(){
			$(row).toggleClass("highlight");
		});

		/// This function hide the itemDirective immediately upon click while http process happens
		/// increases feeling of responsiveness
		$(removeAction).on('click', function(){
			$(row).hide();
		});

	};

	var directive = {
		restrict: 'EA',
		scope: "=name",
		templateUrl: 'views/itemDirective.html',
		link: itemFunc
	};

	return directive;

}]);