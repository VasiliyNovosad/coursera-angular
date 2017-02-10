/**
 * Created by Fr1end on 07.02.2017.
 */
(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    function FoundItems() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'menu',
            bindToController: true
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var menu = this;
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function(result) {
                var foundItems = [];
                angular.forEach(result.data.menu_items, function(value, key){
                    if (value.description.indexOf(searchTerm) != -1) {
                        foundItems.push(value);
                    }
                });
                return foundItems;
            });

            return response;
        };

    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.searchTerm = '';
        menu.found = [];

        menu.getMenuItems = function () {
            if (menu.searchTerm === '') {
                menu.found = [];
            } else {
                var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

                promise.then(function (response) {
                    menu.found = response;
                })
                    .catch(function (error) {
                        console.log(error);
                        menu.found = [];
                    })
            }
        };

        menu.removeItem = function (itemIndex) {
            menu.found.splice(itemIndex, 1);
        }
    }


})();