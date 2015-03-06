'use strict';

/**
 * @ngdoc function
 * @name yoFootballScheduleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoFootballScheduleApp
 */
 function ResultCtrl ($scope, $filter, LeagueService) {

    var res = this;
/*
  	var schedule = Schedule;
    //schedule.generateSchedule(null);

    this.leagueSchedule = schedule.getSchedule();
    console.log($filter('json')(this.leagueSchedule));

    // get scheduled hours for the league
    this.scheduledHours = schedule.getScheduledHours();
    // get teams on this league
    this.teams = schedule.getTeams();
*/

  }

angular.module('yoFootballScheduleApp')
  .controller('ResultCtrl',['$scope','$filter','LeagueService', ResultCtrl]);
