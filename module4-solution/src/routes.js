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
                templateUrl: 'src/templates/home.template.html'
            })

            // Categories list page
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/templates/main-categories.template.html',
                controller: 'MainCategoriesController as ctgr',
                resolve: {
                    items: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })

            // Items detail
            .state('items', {
                url: '/items/{category}',
                templateUrl: 'src/templates/main-items.template.html',
                controller: 'MainItemsController as itemsCtrl',
                params: {
                    category: null
                },
                resolve: {
                    items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.category);
                    }]
                }
            });

    }
})();