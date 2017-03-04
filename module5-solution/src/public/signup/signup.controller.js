(function () {

    angular.module('public')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['UserPreferencesService'];

    function SignupController(UserPreferencesService) {
        var reg = this;

        reg.menuNotExists = false;

        reg.user = {};

        reg.submit = function () {
            UserPreferencesService.getMenuItems(reg.user.menuNumber).then(function(data) {
                if (data.menu_items.length > 0) {
                    UserPreferencesService.setUserInfo(reg.user);
                    reg.completed = true;
                } else {
                    reg.completed = false;
                    reg.menuNotExists = true;
                }

            });


        };
    }

})();