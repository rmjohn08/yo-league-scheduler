/**
 * New node file
 */
var mongoose = require('mongoose');
// "name":null, "id":null, "bracket":"", "shortName":null, schedule : []
exports.TeamSchema = new mongoose.Schema({
	id: {type: Number, required:true},
	name: {type: String, required:true},
	bracket: String,
	shortName: String,
	leagueId: Number
	
});

//exports.TeamSchema = new mongoose.Schema(teamSchema);


