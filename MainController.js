// Code goes here

(function() {

  var app = angular.module('githubViewer');
  var MainController = function($scope, $interval,$location) {

    $scope.search = function(username) {
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = '';
      }
      $location.path('/user/' + username);
    };


    var countdownInterval = null;
    var startCountdown = function() {
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    };

    var decrementCountdown = function() {
      $scope.countdown--;
      if ($scope.countdown < 1) {
        $scope.search($scope.username);
      }
    };


    $scope.username = 'Angular';
    $scope.countdown = 20;
    startCountdown();

  };

  app.controller('MainController', MainController);
}());