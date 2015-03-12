'use strict';

/**
 * @ngdoc overview
 * @name yoFootballScheduleApp
 * @description
 * # yoFootballScheduleApp
 *
 * Main module of the application.
 * angular.module('myModule', ['ui.bootstrap']);
 */
angular
  .module('yoFootballScheduleApp', [
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'config'
  ])
  .config(function ($stateProvider) {
    
    var main = {
        name: 'main',
        url : '/', 
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    },
    results = {
        name : 'results',
        url :'/leagues/:leagueId/results', 
        templateUrl: 'views/leagues/result.html',
        controller: 'LeagueCtrl',
        controllerAs: 'lg' 
    },
    standings = {
        name : 'standings',
        url: '/standings', 
        templateUrl: 'views/standings/standing.html',
        controller: 'StandingCtrl'
      },
      leagues = {
        name: 'leagues',
        url : '/leagues', 
        templateUrl: 'views/leagues/list.html',
        controller: 'LeagueCtrl',
        controllerAs: 'lg'
      },
      leagueDetail = {
        name : 'leagueDetail',
        url : '/leagues/:leagueId', 
        templateUrl: 'views/leagues/league.html',
        controller: 'LeagueCtrl',
        controllerAs: 'lg'
      },
      manageResult = {
        name : 'manageResult',
        url : '/leagues/:leagueId/manage-result', 
        templateUrl: 'views/leagues/manage-results.html',
        controller: 'LeagueCtrl',
        controllerAs: 'lg'

      },
      leagueTeams = {
        name : 'leagueTeams',
        url : '/leagues/:leagueId/teams', 
        templateUrl: 'views/teams/team.html',
        controller: 'TeamCtrl',
        controllerAs : 'tm'
      },
      teamDetail = {
        name : 'teamDetail',
        url : '/leagues/:leagueId/teams/{teamId:[0-9]|new}', 
        templateUrl: 'views/teams/team_edit.html',
        controller: 'TeamCtrl',
        controllerAs : 'tm'

      };

      $stateProvider.state(main);
      $stateProvider.state(results);
      $stateProvider.state(standings);
      $stateProvider.state(leagues);
      $stateProvider.state(leagueDetail);
      $stateProvider.state(manageResult);      
      $stateProvider.state(leagueTeams);
      $stateProvider.state(teamDetail);
      
  });
