(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('MainItemsController', MainItemsController);


    MainItemsController.$inject = ['MenuDataService', 'items'];
    function MainItemsController(MenuDataService, items) {
        var mainlist = this;
        mainlist.items = items;
    }

})();