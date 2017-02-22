(function () {
    'use strict';

    angular.module('MenuApp')
        .component('itemsList', {
            templateUrl: 'src/templates/items.template.html',
            bindings: {
                items: '<'
            }
        });

})();