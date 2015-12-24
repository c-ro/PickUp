angular.module('pickUp', ['ui.router', 'ui.bootstrap', 'ngDialog'])

.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('lists', {
			url: '/lists',
			templateUrl: 'views/lists.html',
			controller: 'ListsCtrl',
			resolve: {
				listsPromise: ['lists', function (lists){
					return lists.getAll();
				}]
			}
		})
		.state('list', {
			url: '/lists/{id}',
			templateUrl: 'views/list.html',
			controller: 'ListCtrl',
			resolve: {
				list: ['$stateParams', 'lists', function($stateParams, lists) {
					return lists.getList($stateParams.id);
				}],
				itemsPromise: ['items', function (items){
					return items.getAll();
				}]
			},
		})
		.state('items', {
			url: '/items',
			templateUrl: 'views/items.html',
			controller: 'ItemsCtrl',
			resolve: {
				itemsPromise: ['items', function (items){
					return items.getAll();
				}]
			}
		});

		$urlRouterProvider.otherwise('/lists');

}]);