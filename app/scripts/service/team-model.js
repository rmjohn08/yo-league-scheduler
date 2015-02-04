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
					teamService.addTeam(team);
				} else {
					teamService.saveTeam(team);

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

		getCounter : function () { return cnt + 1; }


	}

}

angular.module('yoFootballScheduleApp')
  .factory('TeamModel',['TeamService',TeamModel]);
