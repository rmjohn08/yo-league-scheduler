/* 
	id:Number, 
	"name": String,
	"league":Number, 
	date:Date, 
	schedule : [{id:Number, date:String, 
			gameEvents:[{id:Number, number:Number, game_time:String, home:String, away:String, result : [0,0]}]
			}]

	The purpose of this file is to preload a basic configuration for a league. 
	it will seed a basic team schema and leagues. Each team will be linked to a specific league. No team 
	will be linked to more than one league. (not sure what is the advantage of that, usually if you play in a league 
	is that and that's it... )

*/

var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost','leagueScheduler');
var ScheduleSchema = require('../model/LeagueSchedule.js');
var Schedule = db.model('schedules', ScheduleSchema);

var TeamSchema = require('../models/Team.js').TeamSchema;
var Team = db.model('teams',TeamSchema);


var league = new Scheule();
var idIncrement = 0;

var leagueNames = ["League U9","Open Adult","Men 40+","Coed Open"];

var teamSeed = [{"name":"Victory 1","league":1},
		{"name":"Strikers","league":1},{"name":"Sublime","league":1},
		{"name":"Kick Back","league":1},{"name":"Suck Madrid","league":1},
		{"name":"Badcelona","league":1},{"name":"Demolition Team","league":1},
		{"name":"Linoma","league":1},{"name":"OFC Gold","league":2},
		{"name":"Glory","league":2},{"name":"Close Encounter","league":2}, 
		{"name":"Termonuclear","league":2},{"name":"Dividers","league":2},
		{"name":"LFC","league":2},{"name":"Unruly", "league":2},
		{"name":"Team Force","league":2},{"name":"Madrid","league":2},
		{"name":"Bumps","league":2},{"name":"ISC","league":2},
		{"name":"DMC","league":2},{"name":"LFC","league":2},
		{"name":"Fast and Furious","league":2}, {"name":"Intrepids","league":3},
		{"name":"A-Team", "league":3},
		{"name":"Fantastic 11","league":3},{"name":"Inminent Goal","league":3},
		{"name":"Dirty Cleats","league":3},{"name":"Stinky Socks","league":3},
		{"name":"AAA","league":3},{"name":"LFC","league":3},
		{"name":"DMC","league":3},{"name":"Bulls","league":3}
		];

exports.doBasicLeague = function(req, res) {
	console.log('Creating basic league Info');

	for (var idx = 0; idx<leagueNames.length; idx++) {
		league.id = idIncrement++;
		league.name = leagueNames[idx];
		league.league = idIncrement;
		league.date = new Date();
		league.schedule = createEmptySchedule();
		// @TODO save the leagues

	}
	
	console.log('Total League created ' + idIncrement);

	//now do the teams and link to a league

	for (var idx=0; idx<leagueNames.length; idx++) {
		var teamIncr=0;
		for(var i = 0 ; i < teamSeed.length; i++) {
			if (idx == teamSeed[i].league) {
				var team = {id:null, name:null, 
					bracket:null, leagueId:null,
					shortName:null};

				team.leagueId = idx;
				team.name = teamSeed[i].name;
				team.bracket = 'A';
				//@todo add the team

				teamIncr++;
						
			}

		}
		console.log('Total Teams created ' + );
	
	}

	console.log('Done basic configuration... ' + );
}

function createEmptySchedule() {
	return  [{id:null, 
			date:null, 
			gameEvents:[{
					id:null, 
					number:null,
					game_time:null, 
					home:null, 
					away:null, 
					result : [0,0]
				}]
			}];

}