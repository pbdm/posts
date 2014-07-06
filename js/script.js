'use strict';

var amberApp = angular.module('amber', ['ngResource']);

// date
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

// football
amberApp.directive('playground', function($http) {
  var i,
    parent = document.getElementsByClassName("team")[0];
  function link(scope, element, attres) { 
    $http.get('/json/football.json').success(function(data) {
      for(i in data.teams) {
        drawPlayGround(parent, data.meazza, data.m, data.teams[i]);   
      }
    });   
  }
  return {
    link: link,
  };
});


