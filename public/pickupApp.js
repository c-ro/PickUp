angular.module('pickUp', ['ui.router', 'ui.bootstrap', 'ngDialog'])

.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('/', {
			url: '/',
			templateUrl: 'views/lists.html',
			controller: 'ListsCtrl',
			resolve: {
				listPromise: ['lists', function (lists){
					return lists.getAll();
				}]
			}
		}).state('/items', {
			url: '/items.html',
			templateUrl: 'views/items.html',
			controller: 'ItemsCtrl',
			resolve: {
				itemPromise: ['items', function (items){
					return items.getAll();
				}]
			}
		});

		$urlRouterProvider.otherwise('/');

}]);