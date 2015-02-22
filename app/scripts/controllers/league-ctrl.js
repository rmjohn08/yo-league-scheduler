'use strict';

/**
 * @ngdoc function
 * @name yoFootballScheduleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoFootballScheduleApp
 */
 function LeagueCtrl ($scope,$filter,$location,$routeParams,$timeout, LeagueService) {

    var lg = this;
    var leagueId = $routeParams.leagueId;
    LeagueService
      .loadLeague(leagueId)
      .$promise.then(function(data) {
          if (data && data.id ) {
            lg.startDate = data.date;
            lg.leagueLoaded = true;
            LeagueService.loadTeams(leagueId);
            
          } else {
            console.log("League not found :"+ leagueId);

          }
        }, function() {
            console.log("Error retrieving league " + leagueId);
          }

      );


    /*
  	var schedule = Schedule;

    //lg.schedules = schedule.getSchedule();

    lg.schedules = schedule.resource().query({leagueId:1}, function(response) {
      
      //lg.schedules = response;

      if (lg.schedules && lg.schedules.length>0) {
        console.log($filter('json')(lg.schedules));
      }
      
    });

    */
    
    lg.generateSchedule = function() {
        var leagueId = null;                    // somehow need to keep track of current league
        schedule.generateSchedule(leagueId);    // generate league schedule
        lg.schedules = schedule.getSchedule();  
        lg.hasSchedules = scheduleGenerated();
        lg.startDate = leagueStartDate();
    }

    //lg.startDate = leagueStartDate(); 

    lg.manageResults = function() {

      $location.path('/leagues/manage-result');

    }

    lg.leagueLoaded = function() {

      return LeagueService.isLeagueLoaded();
    }

    function scheduleGenerated() {
      return false;
    }
    
}

angular.module('yoFootballScheduleApp')
  .controller('LeagueCtrl',['$scope','$filter','$location','$routeParams','$timeout','LeagueService', LeagueCtrl]);
