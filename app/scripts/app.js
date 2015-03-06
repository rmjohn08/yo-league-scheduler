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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/leagues/:leagueId/results', {
        templateUrl: 'views/leagues/result.html',
        controller: 'LeagueCtrl',
        controllerAs: 'lg' 
      })
      .when('/standings', {
        templateUrl: 'views/standings/standing.html',
        controller: 'StandingCtrl'
      })
      .when('/leagues', {
        templateUrl: 'views/leagues/list.html',
        controller: 'LeagueCtrl',
        controllerAs: 'lg'
      })
      .when('/leagues/:leagueId', {
        templateUrl: 'views/leagues/league.html',
        controller: 'LeagueCtrl',
        controllerAs: 'lg'
      })
      .when('/leagues/:leagueId/manage-result', {
        templateUrl: 'views/leagues/manage-results.html',
        controller: 'LeagueCtrl',
        controllerAs: 'lg'
      })
      .when('/leagues/:leagueId/teams', {
        templateUrl: 'views/teams/team.html',
        controller: 'TeamCtrl',
        controllerAs : 'tm'
      })
      .when('/teams/new', {
        templateUrl: 'views/teams/team_edit.html',
        controller: 'TeamCtrl',
        controllerAs : 'tm'
      })
      .when('/teams/team/:teamId', {
        templateUrl: 'views/teams/team_edit.html',
        controller: 'TeamCtrl',
        controllerAs : 'tm'
      })
      .otherwise({
        redirectTo: '/#'
      });
  });
