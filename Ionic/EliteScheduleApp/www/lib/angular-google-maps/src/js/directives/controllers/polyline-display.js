(function() {
  angular.module("google-maps").controller("PolylineDisplayController", [
    "$scope", function($scope) {
      return $scope.toggleStrokeColor = function() {
        return $scope.stroke.color = ($scope.stroke.color === "#6060FB" ? "red" : "#6060FB");
      };
    }
  ]);

}).call(this);
