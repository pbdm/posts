'use strict';

var amberApp = angular.module('amber', []);

amberApp.controller('dateCtrl', function($scope) {
  $scope.hideDialog = function () {
    $scope.dialogIsHidden = true;
  };
})

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
