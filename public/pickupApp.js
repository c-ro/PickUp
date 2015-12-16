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
					console.log('LISTS State');
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
					console.log('LIST id: ', $stateParams.id);
					return lists.getList($stateParams.id);
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

		// $urlRouterProvider.otherwise('/lists');

}]);