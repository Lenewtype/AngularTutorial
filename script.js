// Code goes here

(function() {

  var app = angular.module('githubViewer', []);
  var MainController = function($scope, github, $interval, $log, $anchorScroll,
    $location) {

    $scope.search = function(username) {
      $log.info('Searching for: ' + username);
      github.getUser(username).then(onUserSubmit, errorFunction);
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = '';
      }
    };

    var onRepos = function(data) {
      $scope.repos = data;
      $location.hash('userDetails');
      $anchorScroll();
    };

    var errorFunction = function(response) {
      $scope.error = 'idk it broke';
      $scope.user = '';
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

    var onUserSubmit = function(data) {
      $scope.user = data;
      $scope.error = '';
      github.getRepos($scope.user).then(onRepos, errorFunction);
    };

    $scope.username = 'Angular';
    $scope.message = 'Github Viewer';
    $scope.repoSortOrder = '-stargazers_count';
    $scope.countdown = 5;
    startCountdown();

  };

  app.controller('MainController', MainController);
}());