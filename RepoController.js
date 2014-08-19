(function(){
  var app = angular.module('githubViewer');
  var RepoController = function($scope, github, $routeParams){
    
    $scope.username = $routeParams.username;
    $scope.reponame = $routeParams.reponame;
    
    var handleGetDetails = function(data){
      $scope.error = '';
      $scope.details = data;
      github.getCollaborators($scope.username, $scope.reponame)
        .then(handleGetCollab, errorHandler);
    };
    
    var handleGetCollab = function(data){
      $scope.collabs = data;
    };
    
    var errorHandler = function(data){
      $scope.error = 'Idk it broke lel';
    }
    github.getRepositoryDetails($scope.username, $scope.reponame)
        .then(handleGetDetails, errorHandler);
    
  };
  app.controller('RepoController', RepoController);
}());