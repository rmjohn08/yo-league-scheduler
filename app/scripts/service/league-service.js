/*
* League Service
*
*
*/

function LeagueService($filter, $resource,$timeout,TeamModel, ENV, scheduleSvc) {

	var leaguePar = ':leagueId';
	var League = [];  				// it will represent a league model???
	var teams = [];
	var scheduledGames = [];

	var scheduler = []; 
	
	function getResource() {
		return $resource(ENV.server + ENV.apiUrl + leaguePar,{},
			{
				leagues: {method: 'GET', isArray:true},
				query: {method: 'GET', params: {leagueId:'@leagueId'}, isArray: false},
				post:  {method: 'POST', params: {leagueId:'@leagueId'}}
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

			return  getResource().query({leagueId:id});
											
	    },
	    loadTeams : function(league) {
	    	TeamModel.getAllLeagueTeams(league)
	    		.query().$promise.then(
	    			function(data) {
						if (data) {
							teams = data; 
						}
					
					},
					function() {
						// nothing was loaded
						console.log("Teams didn't load");
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
	    generateSchedule : function(leagueId) {
	    	scheduler = new scheduleSvc(leagueId);
			scheduler.generateSchedule(teams);
			scheduledGames = scheduler.getSchedule(); 
	    },

	    setSchedule : function(schedule) {
	    	scheduledGames = schedule;
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
	      return $filter('date')(start,'shortDate'); 
	    },

	    /* extract the hours to play in a day, uses the first day */
	    getScheduledHours : function() {

	        if (!scheduledGames || scheduledGames==null) return null;

	        var firstDay = scheduledGames[0];

	        var gameTimes = _.pluck(firstDay.gameEvents,'game_time');

	        for (var i=0; i < gameTimes.length; i++) {
	            gameTimes[i] = $filter('date')(gameTimes[i],'shortTime');

	        }

	        return gameTimes;   
	    }
  	}

}

angular.module('yoFootballScheduleApp')
	.factory('LeagueService',['$filter','$resource','$timeout','TeamModel','ENV','ScheduleSvc',LeagueService]);



