'use strict';

/**
 * @ngdoc function
 * @name yoFootballScheduleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoFootballScheduleApp
 */
 function LeagueCtrl ($scope,$filter,$location, Schedule) {

    var lg = this;

  	var schedule = Schedule;

    lg.schedules = schedule.getSchedule();
    if (this.schedules && this.schedules.length>0) {
      console.log($filter('json')(this.schedules));
    }

    lg.generateSchedule = function() {
        var leagueId = null;          // somehow need to keep track of current league
        schedule.generateSchedule(leagueId);  // generate league schedule
        lg.schedules = schedule.getSchedule();
        lg.hasSchedules = scheduleGenerated();
        lg.startDate = leagueStartDate();
    }

    lg.hasSchedules = scheduleGenerated();

    lg.startDate = leagueStartDate(); 

    lg.manageResults = function() {

      $location.path('/leagues/manage-result');

    }

    function scheduleGenerated() {
      return lg.schedules.length > 0;    
    }
    function leagueStartDate() {
      return schedule.getLeagueStartDate();
    }
    
}

angular.module('yoFootballScheduleApp')
  .controller('LeagueCtrl',['$scope','$filter','$location','Schedule', LeagueCtrl]);
