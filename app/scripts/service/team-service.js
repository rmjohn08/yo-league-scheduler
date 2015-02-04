/*
 * model for the teams crud operations
*
*/
function TeamService () {

	var allTeams = [];

	function getEmptyTeam() {

		return { "name":null, "id":null, "bracket":"", "shortName":null, schedule : [] }; 
	}

	/* public methods */
	return {

		/* get team by id */
		getTeamById : function(teamId) {

			var t = _.where(allTeams, { "id" : parseInt(teamId)} );
			return t;
		},

		/* team by name */
		getTeamByName : function(teamName) {

			return _.findWhere(allTeams,{name:teamName});
		},
		/* save team */
		saveTeam : function(team) {

			var t = _.findWhere(allTeams,{id:team.id});

			if (!t) {
				console.log("Team not found " + team.toString());
			} else {

				t = team;

			}

		},

		/* add a new team */
		addTeam : function(team) {

			var last = allTeams[allTeams.length - 1].id;
			if (!last) last = 0;

			team.id = last + 1; 
			
			allTeams.push(team);


		},

		/* delete team */
		deleteTeam : function(teamId) {

			var rest = _.reject(allTeams, function(el) { el.id == teamId; });
		},

		getLeagueTeams : function(leagueId) {

			if (allTeams.length<=0 && (!leagueId || leagueId == null)) {

				var tmps = ["Linoma","OFC","All Stars","Sampdoria","Secret To Victory","A Team","Lucky Team","Perfect Begin"];	
				for (var i = 0; i < tmps.length; i++) {
					var t = getEmptyTeam();

					t.name = tmps[i];
					t.id = i+1;
					allTeams.push(t);
				}

				return allTeams;
			} 	

			// here return team by using a different method, perhaps local storage, service call, etc... 
			return allTeams;

		}
		
	}

}

angular.module('yoFootballScheduleApp')
  .factory('TeamService',[TeamService]);
