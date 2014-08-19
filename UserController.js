// Code goes here

(function() {

  var app = angular.module('githubViewer');
  var UserController = function($scope, github, $routeParams) {

    var onRepos = function(data) {
      $scope.repos = data;
    };

    var errorFunction = function(response) {
      $scope.error = 'idk it broke';
      $scope.user = '';
    };

    var onUserSubmit = function(data) {
      $scope.user = data;
      $scope.error = '';
      github.getRepos($scope.user).then(onRepos, errorFunction);
    };

    $scope.username = $routeParams.username;
    $scope.repoSortOrder = '-stargazers_count';
    github.getUser($scope.username).then(onUserSubmit,
      errorFunction);


  };

  app.controller('UserController', UserController);
}());