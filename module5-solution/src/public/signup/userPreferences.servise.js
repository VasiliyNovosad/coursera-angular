(function () {
    "use strict";

    angular.module('public')
        .service('UserPreferencesService', UserPreferencesService);

    UserPreferencesService.$inject = ['$http'];

    function UserPreferencesService($http) {
        var service = this;

        var userInfo = {};

        service.setUserInfo = function (info) {
            userInfo = info;
        };

        service.getUserInfo = function () {
            return userInfo;
        };

        service.getMenuItems = function (category) {
            var config = {};
            if (category) {
                config.params = {'category': category};
            }

            return $http.get('https://fr1end-course5.herokuapp.com/menu_items.json', config).then(function (response) {
                return response.data;
            });
        };

    }

})();