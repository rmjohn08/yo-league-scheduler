'use strict';

/**
 * @ngdoc function
 * @name yoFootballScheduleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoFootballScheduleApp
 */
 function MainCtrl ($scope,$filter) {

  	$scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


  }

angular.module('yoFootballScheduleApp')
  .controller('MainCtrl',['$scope','$filter', MainCtrl]);
