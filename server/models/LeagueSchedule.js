/**
 * New schema file
 */
var mongoose = require('mongoose');
// "name":null, "id":null, "bracket":"", "shortName":null, schedule : []
exports.LeagueScheduleSchema = new mongoose.Schema({
	id:Number, 
	name: String,
	league:Number, 
	date:Date, 
	schedule : [{id:Number, date:String, 
			gameEvents:[{id:Number, number:Number, game_time:String, home:String, away:String, result : [0,0]}]
			}]
});

