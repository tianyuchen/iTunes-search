'use strict';

angular.module('myApp.view', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view', {
    templateUrl: 'views/view.html',
    controller: 'viewCtrl'
  });
}])

.controller('viewCtrl', function($scope, $http) {

  $scope.submitSearch = function(url){
    $http({
     url: 'https://itunes.apple.com/search',
     method: "GET",
     params: {term: $scope.searchText}
    }).success(function(data) {
      var i, searchResults =[];

      for (i = 0; i < data.resultCount; i++) {
        var result = {};
        result['trackName'] = data.results[i]['trackName'];
        result['artistName'] = data.results[i]['artistName'];
        result['artworkUrl60'] = data.results[i]['artworkUrl60'];
        result['trackPrice'] = data.results[i]['trackPrice'];
        searchResults.push(result);
      }
      $scope.results = searchResults;
      $scope.searched = true;
    });
  }

  var total = 0;
  $scope.addProduct = function(price){
    total += price;
    document.getElementById("total").innerHTML = "Total : " + total.toFixed(2);
  }
});
