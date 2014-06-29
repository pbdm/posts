'use strict';

var amberApp = angular.module('amber', ['ngResource']);

amberApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

amberApp.controller('dateCtrl', function($scope) {
  $scope.hideDialog = function () {
    $scope.dialogIsHidden = true;
  };
});

amberApp.directive('myCurrentTime', function($interval, dateFilter) {
  var format = 'yyyy/MM/dd HH:mm:ss';     
  function link(scope, element, attres) {  
    function updateTime() {
      scope.myDate = dateFilter(new Date(), format);
    }
    updateTime(); 
    $interval(function() {
      updateTime(); 
    }, 1000);
  }
  return {
    link: link,
    templateUrl: '/tmpl/my-date.html',
    scope: {
      'close': '&onClose'
    }
  };
});

//douban
// amberApp.factory('douban', ['$resource', function($resource) {
//   var res = $resource("http://api.douban.com/v2/book/1220562", {}, {
//     query: {method: 'JSONP', params:{callback:'abc'}}
//   }); 
//   return res;
// }]);
amberApp.factory('douban', ['$resource', function($resource) {
  var res = $resource("/json/douban_pbdm.json", {}, {
    query: {method: 'GET'}
  }); 
  return res;
}]);
// var movies;
// function abc(movie){

//   movies = movie;
//   console.log(movies);
// }
amberApp.controller('doubanMovie', ['$scope', '$http', 'douban', function($scope, $http, douban) {
 
  $scope.douban = douban.query();
 
  
  // $scope.douban = douban.get({callback:'abc'}, function(phone) {
  //   console.log(phone);
  //   //$scope.mainImageUrl = phone.images[0];
  // });
  // $scope.abc = abc;
  // console.log($scope.abc);
  //console.log($http);
  
  //var myURL = 'http://api.douban.com/v2/book/1220562?callback=abc';
  
  // var myURL = '/json/douban_pbdm.json';
  // var my = $http.get(myURL).success(function(data){
  //   console.log(data);
  // });
}]);


