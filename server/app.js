
/**
 * Module dependencies.
 * this will load module dependencies and fire up 
 * the node server. 
 * node app.js
 * 
 * then you can start mongo with something like
 * mongod --dbpath=pathtoyourdb
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
//if ('development' == app.get('env')) {
//  app.use(express.errorHandler());
//}

//Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', routes.index);

// routes for the leagues app
app.get('/leagues/teams', routes.teamsList);        // list all teams
app.get('/leagues/teams/:id', routes.team);         // gets a single team 
app.post('/leagues/teams', routes.createTeam);      // adds a team
app.put('/leagues/teams/:id', routes.updateTeam);   // update a team
// league and schedules
app.get('/leagues/:leagueId', routes.leagueInfo);
app.get('/leagues/:leagueId/events', routes.schedulesList);   // all schedules for league
app.post('/leagues/:leagueId/events', routes.addDayEvent);    // adds a day of games
app.post('/leagues/:leagueId', routes.updateSchedules);       // updates schedules
app.get('/leagues', routes.schedulesList);                   // all leagues

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
