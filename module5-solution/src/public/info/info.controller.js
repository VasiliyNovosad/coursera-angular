(function() {
    angular.module('public')
        .controller('InfoController', InfoController);

    InfoController.$inject = ['UserPreferencesService'];

    function InfoController(UserPreferencesService) {
        var reg = this;

        reg.user = UserPreferencesService.getUserInfo();
        console.log(reg.user);

        if (reg.user.menuNumber !== null) {
            UserPreferencesService.getMenuItems(reg.user.menuNumber).then(function (data) {
                reg.category = data.category;
            });
        }

        reg.isUserUnregistered = function() {
            return !reg.user.registered;
        }
    }
})();