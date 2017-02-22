(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('MainItemsController', MainItemsController);


    MainItemsController.$inject = ['items'];
    function MainItemsController(items) {
        var mainlist = this;
        mainlist.items = items;
    }

})();