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
                foundItems: '<',
                onRemove: '&'
            }
        };

        return ddo;
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
                angular.forEach(result.data, function(value, key){
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

        var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

        promise.then(function (response) {
            menu.found = response;
        })
            .catch(function (error) {
                console.log(error);
            });

        menu.getMenuItems = function () {
            var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

            promise.then(function (response) {
                console.log(response.data);
            })
                .catch(function (error) {
                    console.log(error);
                })
        };

        menu.removeItem = function (itemIndex) {
            menu.found.splice(itemIndex, 1);
        }
    }


})();