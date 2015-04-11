/*
 * model for the teams crud operations
*
*/
function TeamModel (teamService) {

	var cnt =0;

	/* apis exposed to the world */
	return {

		/* get team by id */
		getTeamById : function(id) {
			return teamService.getTeamById(id);

		},

		/* team by name */
		getTeamByName : function(name) {
			return teamService.getTeamByName(name);

		},
		/* save team */
		saveTeam : function(team) {

			if (team) {

				if (team.id == null) {
					return teamService.addTeam(team);
				} else {
					return teamService.saveTeam(team);

				}

			} 

		},

		/* delete team */
		deleteTeam : function(id) {

		},

		/* get league teams */
		getLeagueTeams : function(leagueId) {

			return teamService.getLeagueTeams(leagueId);

		},
		getTempTeams : function() {
			return teamService.getTempTeams();
		},
		/* service returns all teams, it's a small so do the filtering by leagueId here for now 
			a promise is returned so the controller can handle the output.
		*/
		getAllLeagueTeams : function(leagueId) {
			var filteredTeams = [];
			return teamService.resource().query(function(myTeams) {
				// iterate through each team array and return only 
				// the ones belonging to the league
				myTeams.forEach(function(team) {
					if (team.leagueId == leagueId)
						filteredTeams.push(team);
				
				});

			}).$promise;

			//return teamService.getAllLeagueTeams(leagueId).query().$promise;

		},

		resource : function() {
			return teamService.resource();
		},

		getCounter : function () { return cnt + 1; }


	}

}

angular.module('yoFootballScheduleApp')
  .factory('TeamModel',['TeamService',TeamModel]);
