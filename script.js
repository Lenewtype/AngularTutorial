// Code goes here

var MainController = function($scope, $http) {


  $scope.search = function(username) {
    $http.get("https://api.github.com/users/" + username)
      .then(onUserSubmit, errorFunction);
  };
  var onRepos = function(response) {
    console.log('called');
    $scope.repos = response.data;
  };
  
  var errorFunction = function (response){
    $scope.error = 'idk it broke';
    $scope.user = '';
  };
  
  var onUserSubmit = function(response){
    $scope.user = response.data;
    $scope.error = '';
    $http.get($scope.user.repos_url).then(onRepos, errorFunction);
  };
  
  $scope.message = 'Github Viewer';
  $scope.repoSortOrder = '-stargazers_count';
};