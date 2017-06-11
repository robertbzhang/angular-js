(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchList = ""
  $scope.response = "";

  $scope.generateResponse = function() {
    var listLength = $scope.lunchList.split(',').length;
    if ($scope.lunchList == "") {
      $scope.response = "Please enter data first"
    } else if (listLength <= 3) {
      $scope.response = "Enjoy!";
    } else {
      $scope.response = "Too much!";
    }
  };
}

})();
