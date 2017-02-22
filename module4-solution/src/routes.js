(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
            .state('home', {
                url: '/',
                templateUrl: 'src/shoppinglist/templates/home.template.html'
            })

            // Premade list page
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/shoppinglist/templates/main-shoppinglist.template.html',
                controller: 'MainShoppingListController as mainList',
                resolve: {
                    items: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })

            // Item detail
            .state('categories.items', {
                // url: '/item-detail/{itemId}',
                templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
                controller: 'ItemDetailController as itemDetail',
                params: {
                    categoryId: null
                },
                resolve: {
                    items: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getItemsForCategory();
                    }]
                }
            });

    }
})();