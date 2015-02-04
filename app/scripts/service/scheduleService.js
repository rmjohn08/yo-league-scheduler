// considerations and assumptions :
// number of teams available - will vary but at least a min of 4
// a start date can autocalculate and end date after 8 weeks. 
// number of weeks to play - 8 weeks
// make up games will need to be added as a way to customize games in calendar
// game times - duration - 50 min
// games per week - most likely once per week
//
// number times a team play each other
// number times a different bracket plays another bracket 

function ScheduleSvc ($filter, TeamModel) {
  var filter = $filter;

  var teams = [];               // teams
  var scheduledGames = [];      // games that have been scheduled      

  var leagueStartDate;          // start date
  //var leagueSchedule=[];      // the full league schedule

  // these variables can be configurable
  var numberOfWeeks = 8;         // number of weeks 
  var numberOfGamesPerDay = 6;
  var gameMinutesDuration = 50;  // 50 min
  var playEachOther = 2;         // default to min of 2 times
  var playOtherBracket = 1;      // times team play on other brackets
  
  /*
  * generates a temporary array of teams
  */
  function setTemporaryTeams() {
      teams = TeamModel.getLeagueTeams(null);
  }

  /* creates schedule for a league */
  function makeSchedules() {
    //generates a new schedule
    scheduledGames = [];

    var nextEventInDays = 7;
    var gameDate = leagueStartDate || new Date();
    gameDate.setHours(19);
    gameDate.setMinutes(0);

    if (scheduledGames.length == numberOfWeeks) {
      //no need to add more weeks
      return; 
    }

    for (var i = 0; i < numberOfWeeks; i++) {  
      var dayEvent = {id:null,"date":null, gameEvents:[]};
      dayEvent.id = i+1;
      
      gameDate.setHours(19);
      gameDate.setMinutes(0);

      var games = [];
      for (var j=0; j<numberOfGamesPerDay; j++) {
          /* event json structure 
            assumption on result is 0-home, 1-away
          */
          var gameEvent = {"id": 0, "number":0,"date":null, "game_time":null, "home":null, "away":null, result : [0,0] };

          gameEvent.number = j+1; 
          gameEvent.date = gameDate; 
          gameEvent.game_time = gameDate.getHours() + ':' + gameDate.getMinutes(); 
          games.push(gameEvent);

          //increment the time period
          gameDate.setMinutes(gameDate.getMinutes() + gameMinutesDuration);
          
      } 

      // a new date
      dayEvent.date = filter('date')(gameDate, 'MM/dd/yyyy');//gameDate.getDate();
      dayEvent.gameEvents = games;
      scheduledGames.push(dayEvent);
      //next week
      gameDate.setDate(gameDate.getDate() + nextEventInDays);

    } 

    // games should now be scheduled

  }

  function assignGames() {
    //@todo
    // for a team select an opponent randomly from list of teams 
    // from games scheduled assign a time to play each week 
    // for each scheduled game assign two teams
    //

    for (var i = 0; i < teams.length; i++) {
        var team = teams[i];

        var otherTeams = _.reject(teams,function(ele){
            return ele.id==team.id;
        });

        team.opponents = _.shuffle(_.pluck(otherTeams,"name"));
       
    }

   //@todo 
   //add additional criteria for team playing same bracket against other teams, etc 
   // 
   for (var day = 0; day<scheduledGames.length; day++) {
      var gameEvent  = scheduledGames[day];
      var games = gameEvent.gameEvents;
      var copyTeams = _.clone(teams);
      
      // assign teams to games
      for (var i = 0; i<games.length; i++) {

          if (copyTeams.length <= 0) break; //no enough teams

          var idx = _.random(copyTeams.length)-1;
          idx = idx<0 ? 0:idx;
          var t = copyTeams[idx];
          copyTeams = removeItem(copyTeams, copyTeams[idx].id);

          var idx2 = _.random(copyTeams.length)-1;
          idx2 = idx2<0 ? 0:idx2;
          var t2 = copyTeams[idx2];
          copyTeams = removeItem(copyTeams, copyTeams[idx2].id);

          if (t && t2) {
            games[i].home = t.id;
            games[i].away = t2.id; //_.last(t.opponents); //[day];

          } else {
            console.log('idx creates an undefined team idx::'+ idx)
          } 

      }

   }

  }

  function getAllResults() {
    // return all games reults so far
    // TODO this will need to have an id when managing multiple league, bit for now assume just one 
    // league at a time

    // here I could generate something random...

  }

  /* method that will enter a game result */
  function setGameResult() {


  }

  /* method will get a game result */
  function getGameResult() {

  }



  // select a team from list and remove selected team
  function getTeamRandomly(copyTeams) {

    var idx2 = _.random(copyTeams.length)-1;
    idx2 = idx2<0 ? 0:idx2;
    var t2 = copyTeams[idx2];
    copyTeams = removeItem(copyTeams, copyTeams[idx2].id);

    return t2;
    
  }

  function removeItem(arr, idx) {
    return _.without(arr, _.findWhere(arr, {id: idx}));

  }

  function pickRandomElement(max) {
    return [Math.floor(Math.random() * max)];
  }

  return {
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
    getSchedule : function() { return scheduledGames; } ,

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
  .factory('Schedule',['$filter','TeamModel',ScheduleSvc]);

/*
angular.module('yoFootballScheduleApp')
  .controller('MainCtrl',['$scope','$filter','Schedule', MainCtrl]);
*/