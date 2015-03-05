
/*
 * GET home page.
 */

var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost','leagueScheduler');

var TeamSchema = require('../models/Team.js').TeamSchema;
var LeagueSchedule = require('../models/LeagueSchedule.js').LeagueScheduleSchema;

var Team = db.model('teams', TeamSchema);

var counter = 0;
Team.count({}, function(err, count) {
	counter = count;
	if (counter==0) {
		counter = 10;
	} else {
		counter = counter + 5;
	}
});

exports.index = function(req, res){
	  res.render('index', { title: 'Express' });
};

// json for getting all teams
exports.teamsList = function(req, res) {
	
	var query = Team.find();
	
	query.exec(function(err, teams) {
		if (err) return {error:'an error occurred '};
		
		//counter = teams.length;
		//counter++;
			
		res.json(teams);
		//res.send(teams);
		
	});
};
exports.team = function(req, res) {
	 
	 var teamId = req.params.id;
     
     Team.find({id:teamId}, '', { lean: true }, function(err, team) {
       if(team) {
         
         res.json(team);
       } else {
         res.json({error:true});
       }
     });
	
};

exports.createTeam = function (req, res) {
	
	var body = req.body;
	
	var team = {_id:null, id:++counter, name:body.name, bracket:body.bracket,leagueId:body.leagueId, shortName:body.shortName};
	
	var newTeam = new Team(team);
	newTeam.save( function(err, doc) {
		if (err || !doc) {
			throw 'Error' + ' ' + err;
		} else {
			res.json(doc);
		}
	});
	
	
};

exports.updateTeam = function (req, res) {
	
	var body = req.body;
	var id = req.params.id;

	//Team.find({id:id}, '', { lean: true }, function(err, team) {
	Team.findOne({id:id}, function(err, team) {
       if(team) {
			// var team = {id:body.id, name:body.name, bracket:body.bracket, shortName:body.shortName};
       		team.name = body.name;
       		team.bracket = body.bracket;
       		team.shortName = body.shortName;
       		team.leagueId = body.leagueId;
    		team.save(function(err, doc) {
				if (err || !doc) {
					throw 'Error';
				} else {
					res.json(doc);
				}
			});	     
         
       } else {
         res.json({error:true});
       }
     });
};

var Schedules = db.model('schedules', LeagueSchedule);

exports.leagueInfo = function(req, res) {
	var leagueId = req.params.leagueId;
	console.log("Finding league :"+leagueId);

	Schedules.findOne({id:leagueId}, function(err, league) {
       if(league) {
         
         res.json(league);
       } else {
       	 console.log('Error '+ err);
         res.json({error:true, description:'Trying to read league with id '+leagueId});
       }
     });

};

exports.updateSchedules = function (req, res) {
	
	var body = req.body;
	var id = req.params.leagueId;

	//Team.find({id:id}, '', { lean: true }, function(err, team) {
	Schedules.findOne({id:id}, function(err, league) {
       if(league) {
			// var team = {id:body.id, name:body.name, bracket:body.bracket, shortName:body.shortName};
       		league.schedule = body.schedule;

    		league.save(function(err, doc) {
				if (err || !doc) {
					throw 'Error';
				} else {
					res.json(doc);
				}
			});	     
         
       } else {
         res.json({error:true});
       }
     });

};

/* all schedules  */
exports.schedulesList = function (req, res) {

	var query = Schedules.find();
	query.select('id name date -_id');

	query.exec(function(err, data) {
		if (err) return {error:'an error occurred in schedulesList'};
		
		
		//res.send(teams);
		res.json(data);
		
	});

};

/* all schedules for a league */
exports.schedulesByLeague = function (req, res) {

	var leagueId = req.params.leagueId;
     
	var query = LeagueSchedule.find({league:leagueId});
	
	query.exec(function(err, schedules) {
		if (err) return {error:'an error occurred in schedulesList'};
		
		//res.send(teams);
		res.json(schedules);
		
	});

}

/* adds a day event. A day event represent a day with all games */
exports.addDayEvent = function (req, res) {

	var body = req.body;
	var dayEvent = {id:body.id,name:body.name,date:body.date,gameEvents:body.gameEvents}; //
	
	var newEvent = new Schedules(dayEvent);
	newEvent.save( function(err, doc) {
		if (err || !doc) {
			throw 'Error' + ' ' + err;
		} else {
			res.json(doc);
		}
	});
	
};
