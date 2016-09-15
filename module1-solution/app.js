(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchMenu = "";
  $scope.messageText = "";
  $scope.messageColor = 'lightgray';
  $scope.checkIfTooMach = function () {
    if ($scope.lunchMenu.trim().length === 0) {
      $scope.messageColor = 'red';
      $scope.messageText = "Please enter data first";
    } else {
      var itemsList = $scope.lunchMenu.split(',');
      if (itemsList.length <= 3) {
        $scope.messageText = "Enjoy!";
      } else {
        $scope.messageText = "Too much!";
      }
      $scope.messageColor = 'green';
    }
  };
};

})();
