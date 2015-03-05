'use strict';

 function TeamCtrl ($scope, $routeParams,$location,$filter, teamModel) {

    var tm = this;
    var leagueId = $routeParams.leagueId;

    var teamResource = teamModel.resource(); //teamModel.getTeamById(teamId);
    var teamId = $routeParams.teamId
    if ( teamId != null) {

      //teamModel.getLeagueTeams(null);
      var teamId = $routeParams.teamId;
      teamResource.query({id:teamId}).$promise.then(function(response) {
          var t = response[0]; //$filter('json')(response);
          if (t) {
            tm.team = t;
          } else { 
            tm.team = null;

          }  
      });

    } else if ($location.path().indexOf('/new')>=0) {
      tm.team = {id:null, name:'', bracket:'', shortName:''};

    } else {

      //tm.allTeams =    // static list with all teams for league
      //  teamModel.getLeagueTeams(leagueId);

      /* retrieves all teams available from db unsing $resource */
      //teamModel.getAllLeagueTeams(null).query(function(myTeams) {
      teamResource.query(function(myTeams) {

        if (myTeams) {
          console.log(myTeams);
          tm.allTeams = myTeams;
        }
          
      });

    }

    /* saves a team using the $resource service */
    tm.submitForm = function() {

      /* tm.team.id = null;
      teamModel.saveTeam(tm.team).save(tm.team, function() {
          tm.message = "Team saved";  
      });
      */
      if (!tm.team.id || tm.team.id == '') {
         teamResource.post(tm.team, function() {
            tm.message = 'Team Added';

         }); 
      } else {   
          teamResource.update(tm.team, function() {
             tm.message = "Team saved";

        }); 
      
      }  
    }

    tm.cancelEdit = function() {
      $location.path('/teams');
    }

    tm.message = "";
    
}

angular.module('yoFootballScheduleApp')
  .controller('TeamCtrl',['$scope','$routeParams','$location','$filter', 'TeamModel', TeamCtrl]);
