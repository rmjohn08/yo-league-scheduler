/*
 * model for the teams crud operations
*
*/
function TeamService ($resource) {


    var server ='http://localhost:3000/';
    var leagueApi = 'leagues/';
    var teams = "teams/:id";

    var getTeams = 'teams/';
    var newTeams = 'teams/new';

	var allTeams = [];

	function getEmptyTeam() {

		return { "name":null, "id":null, "bracket":"", "shortName":null, schedule : [] }; 
	}

	/* public methods */
	return {

		/* get team by id */
		getTeamById_v1 : function(teamId) {

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

		/* delete team */
		deleteTeam : function(teamId) {

			var rest = _.reject(allTeams, function(el) { el.id == teamId; });
		},
		/* retuns temp teams */
		getTempTeams : function(leagueId) {

			var tmps = ["Linoma","OFC","All Stars","Sampdoria","Secret To Victory","A Team","Lucky Team","Perfect Begin"];	
			for (var i = 0; i < tmps.length; i++) {
				var t = getEmptyTeam();

				t.name = tmps[i];
				t.id = i+1;
				allTeams.push(t);
			}

			return allTeams;

		},

		getAllLeagueTeams : function(leagueId) {

			return $resource(server + leagueApi + getTeams); 
			
		},
		/* add a new team */
		addTeam : function(team) {

			var last = allTeams[allTeams.length - 1].id;
			if (!last) last = 0;

			team.id = last + 1; 
		
			// new team allTeams.push(team);

			/* var CreditCard = $resource('/user/:userId/card/:cardId',
 				{userId:123, cardId:'@id'}, {charge: {method:'POST', params:{charge:true}}
 				});
			*/
			
			return $resource(server + leagueApi + newTeams,  { id: '@id' }, {
    			update: { method: 'PUT'},
    			post: {method: 'POST'}
    		});


		},
		/* get team by id */
		getTeamById : function(teamId) {

			return $resource(server + leagueApi + getTeams +':id',  { id: '@id' }, {
    			update: {
      				method: 'PUT'
    			}});

			
		},

		resource : function () {
			return $resource(server + leagueApi + teams, {id: '@id'}, {
				update: {method: 'PUT', params:{id:'@id'}},
	    		post: 	{method: 'POST',params:{id:'@id'}},
	    		query: 	{method: 'GET', params: {id:''}, isArray:true},
	    		remove: {method: 'DELETE'}
    		});
		}
	}

}

angular.module('yoFootballScheduleApp')
  .factory('TeamService',['$resource',TeamService]);


/*
angular.module('pollServices', ['ngResource']).
          factory('Poll', function($resource) {
            return $resource('polls/:pollId', {}, {
              query: { method: 'GET', params: { pollId: 'polls' }, isArray: true }
            })
          });
*/