/*
* League Service
*
*
*/

function LeagueService($filter, $resource,$timeout,TeamService, ENV) {

	var leaguePar = ':leagueId';
	var League = [];  				// it will represent a league model???
	var teams = [];
	
	function getResource() {
		return $resource(ENV.server + ENV.apiUrl + leaguePar,{},
			{
				query: {method: 'GET', params: {}, isArray: true},
				post: {method: 'POST'}
			});
	}

	function loadLeagueById(id) {

		getResource().get({leagueId:id}, function(response) {
			if (response) {
				League = response	
			} else {
				console.log("League was not found");
			}
			
		});

	}

	/* public calls */
	return {
    	// resource object for api requests
	    resource : function () { return getResource() },

	    loadLeague : function(id) {
	    	//@todo load a league based on the league id
	    	// populate the teams for the league
	    	// populate the schedule if available for the league
	    	// provide an access to this objects so the controller can use them
	    	//

	    	/* getResource().get({leagueId:id}, function(response) {
				if (response) {
					League = response;

					return $timeout(function() {
				        return League;

				    });	

				} else {
					console.log("League was not found");

					return $timeout(function() {
				        return null;

				    });
				}
				
			}); */

			return  getResource().get({leagueId:id});
						
					
	    },
	    loadTeams : function(league) {
	    	TeamService.getAllLeagueTeams()
	    		.query().$promise.then(
	    			function(data) {
						if (data) {
							teams = data;	
						}
					
					},
					function() {
						// nothing was loaded
						console.log('Team didnt load')
					}

				);
	    },

	    isLeagueLoaded : function() {
	    	return (League && League.id && League.id > 0); 
	    },

	    getLeague : function() {
	    	return League;
	    },

	    /* generates the schedule for league */
	    generateSchedule : function(Teams) {
	        
	        if (teams == null || teams== undefined || teams.length<=0) {
	            teams = [];
	            setTemporaryTeams();

	        }

	        makeSchedules();
	        //@todo assign teams to scheduled games
	        assignGames();

	    },

	    /* the league schedule */
	    getSchedule : function() { 
	      return scheduledGames; 
	    },

	    /* set the teams for league */
	    setTeams : function(leagueTeams) {
	      teams = leagueTeams;
	    },

	    /* get teams */
	    getTeams : function () { return teams; },

	   /* set the league start date */
	    setLeagueStartDate : function(startDate) {
	      leagueStartDate = startDate;
	    }, 

	    /* gets the league start date */
	    getLeagueStartDate : function () { 
	      var start = leagueStartDate || new Date();
	      return filter('date')(start,'shortDate'); 
	    },

	    getScheduledHours : function() {

	        if (!scheduledGames || scheduledGames==null) return null;

	        var firstDay = scheduledGames[0];

	        var gameTimes = _.pluck(firstDay.gameEvents,'game_time');

	        for (var i=0; i < gameTimes.length; i++) {
	            gameTimes[i] = filter('date')(gameTimes[i],'shortTime');

	        }

	        return gameTimes;   
	    }
  	}

}

angular.module('yoFootballScheduleApp')
	.factory('LeagueService',['$filter','$resource','$timeout','TeamService','ENV',LeagueService]);



