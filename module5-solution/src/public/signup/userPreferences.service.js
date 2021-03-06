(function () {
    "use strict";

    angular.module('public')
        .service('UserPreferencesService', UserPreferencesService);

    UserPreferencesService.$inject = ['$http'];

    function UserPreferencesService($http) {
        var service = this;

        var userInfo = {registered: false};

        service.setUserInfo = function (info) {
            userInfo = info;
            userInfo.registered = true;
        };

        service.getUserInfo = function () {
            return userInfo;
        };

        service.getMenuItems = function (category) {
            var config = {};
            return $http.get('https://fr1end-course5.herokuapp.com/menu_items/' + category + '.json', config).then(function (response) {
                return response.data;
            });
        };

    }

})();