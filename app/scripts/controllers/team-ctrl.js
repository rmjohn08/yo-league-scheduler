'use strict';

 function TeamCtrl ($scope, $routeParams,$location, teamModel) {

    var tm = this;
    var leagueId = null;


    if ($routeParams.teamId != null) {

      teamModel.getLeagueTeams(null);
      var teamId = $routeParams.teamId;
      var t = teamModel.getTeamById(teamId);

      if (t && t.length > 0)
        tm.team = t[0];
      else 
        tm.team = null;

    } else {

      tm.allTeams =    // all teams for league
        teamModel.getLeagueTeams(leagueId);
    }

    tm.submitForm = function() {

      teamModel.saveTeam(tm.team);
      tm.message = "Team saved";
    }

    tm.cancelEdit = function() {
      $location.path('/teams');
    }

    tm.message = "";
}

angular.module('yoFootballScheduleApp')
  .controller('TeamCtrl',['$scope','$routeParams','$location', 'TeamModel', TeamCtrl]);
