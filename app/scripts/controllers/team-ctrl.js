'use strict';

 function TeamCtrl ($scope, $stateParams,$state,$filter, teamModel) {

    var tm = this;
    var leagueId = $stateParams.leagueId;

    tm.leagueId = leagueId;

    var teamResource = teamModel.resource(); //teamModel.getTeamById(teamId);
    var teamId = $stateParams.teamId
    if ( teamId != null && teamId != 'new') {

      //teamModel.getLeagueTeams(null);
      //teamResource.query({id:teamId}).$promise.then(function(response) {
      teamModel.getTeamById(teamId).then(function(response) {
          var t = response[0]; //$filter('json')(response);
          if (t) {
            tm.team = t;
          } else { 
            tm.team = null;

          }  
      });

    } else if (teamId == 'new') {
      tm.team = {id:null, name:'', bracket:'', shortName:''};

    } else { // query all teams. 

      /* retrieves all teams available from db using $resource */
      teamModel.getAllLeagueTeams(leagueId).then(function(myTeams) {
      //teamResource.query(function(myTeams) {

        if (myTeams) {
          console.log(myTeams);
          tm.allTeams = myTeams;
        }
          
      });

    }

    /* saves a team using the $resource service */
    tm.submitForm = function() {

      //tm.team.id = null;
      teamModel.saveTeam(tm.team).then(function() {
          tm.message = "Team saved";  
      });

    }

    tm.cancelEdit = function() {
      $state.go('leagueTeams',{leagueId:leagueId});
      //$location.path('/teams');
      // #/leagues/1/teams
    }

    tm.message = "";
    
}

angular.module('yoFootballScheduleApp')
  .controller('TeamCtrl',['$scope','$stateParams','$state','$filter', 'TeamModel', TeamCtrl]);
