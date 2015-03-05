'use strict';

/**
 * @ngdoc function
 * @name yoFootballScheduleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoFootballScheduleApp
 */
 function LeagueCtrl ($scope,$filter,$location,$routeParams,$timeout, LgSvc) {

    var LeagueService = LgSvc;
    var lg = this;                                    // controller as variable...
    var leagueId = $routeParams.leagueId;             // keeps the current leagueId
    lg.league = [];                                   // league object
    lg.hasSchedules = false;
    lg.leagueService = LeagueService;
    
    lg.allLeagues = [];

    if (!leagueId) {
      // no single league viewing
      LeagueService.resource().leagues().$promise.then(function(rows) {
          if (rows) {
            lg.allLeagues = rows;
          } else {
            console.log('No leagues available...');   
          }
      });
      
    } else if ($location.path().indexOf("manage-result")<0) {
      
      loadLeague();
    
    } else {
      //not a path for leagues

    }

    // get league info
    function loadLeague() {
      LeagueService.resource().query({leagueId:leagueId})
        .$promise.then(function(data) {
            if (data && data.id ) {
              
              lg.league = data;
              lg.hasSchedules= scheduleGenerated();
              if (lg.hasSchedules)  {
                LeagueService.setSchedule(data.schedule);
              }

              LeagueService.loadTeams(leagueId);
              
            } else {
              console.log("League not found :"+ leagueId);

            }
          }
        );
    }

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
        LeagueService.generateSchedule(leagueId);     // generate league schedule
        
        // cannot continue doing this serial mode   
        lg.hasSchedules = (LeagueService.getSchedule() && LeagueService.getSchedule().length > 0);
        if (lg.hasSchedules) {
           lg.league.schedule = LeagueService.getSchedule();
           lg.league.leagueId = leagueId;
           LeagueService.resource().post(lg.league)
            .$promise.then(function(data) {
                console.log('schedule saved...');
              }
            ); 

        };
        // 
    }

    //lg.startDate = leagueStartDate(); 

    lg.manageResults = function() {

      $location.path('/leagues/'+leagueId + '/manage-result');

    }

    lg.teamManagement = function() {
      $location.path('/leagues/'+leagueId + '/teams');
    }

    lg.leagueLoaded = function() {

      return LeagueService.isLeagueLoaded();
    }

    function scheduleGenerated() {
      return (lg.league.schedule && lg.league.schedule.length>0);
    }
    
}

angular.module('yoFootballScheduleApp')
  .controller('LeagueCtrl',['$scope','$filter','$location','$routeParams','$timeout','LeagueService', LeagueCtrl]);
