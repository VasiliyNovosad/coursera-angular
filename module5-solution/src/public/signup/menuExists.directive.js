(function() {
    angular.module('public')
        .directive('menuExists', MenuExistsDirective);

    MenuExistsDirective.$inject = ['UserPreferencesService'];

    function MenuExistsDirective(UserPreferencesService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(value) {

                    if(value){
                        UserPreferencesService.getMenuItems(value).then(function(data) {
                            // test and set the validity after update.
                            var valid = data.menu_items.length > 0;
                            ctrl.$setValidity('menuExists', valid);
                            return valid ? value : undefined;
                        });

                    } else {
                        return undefined;
                    }
                });
            }
        };



        // return {
        //     restrict: 'A',
        //     require: '?ngModel',
        //     link: function(scope, elm, attr, ctrl) {
        //         if (!ctrl) return;
        //         attr.required = true; // force truthy in case we are on non input element
        //
        //         ctrl.$validators.required = function(modelValue, viewValue) {
        //             return !attr.required || !ctrl.$isEmpty(viewValue);
        //         };
        //
        //         attr.$observe('required', function() {
        //             ctrl.$validate();
        //         });
        //     }
        // };




    }
})();