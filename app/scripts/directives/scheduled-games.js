function ScheduledGames($compile,$templateCache,$templateRequest,$document, $modal) {

	/* return {
	    restrict: 'A',
	    require: ['ngModel', '^form'],
	    replace: true,
	    scope: {
	      ngModel: '=',
	      field: '=',
	      raceConfig: '=',
	      calculatedValues: '=',
	      editPermission: '@',
	      dependentValue: '='
    }*/
    return {
    	restrict: 'AE',
    	scope: {
    		manage : '='
    	},
    	replace: true,
    	templateUrl: 'scripts/directives/tmpl_scheduled_games.html',
    	controller: ['$scope', '$timeout','$filter','LeagueService',
      	function($scope, $timeout, $filter, LeagueService) {

		    var res = this;
		   	var modalInstance;
		  	var schedule = LeagueService; //$scope.$parent.lg.leagueService;
		   
		    $scope.leagueSchedule = schedule.getSchedule();

		    if ($scope.leagueSchedule && $scope.leagueSchedule.length>0)	{
			    console.log($filter('json')($scope.leagueSchedule));

			    //// get scheduled hours for the league
			    $scope.scheduledHours = schedule.getScheduledHours();
			    //// get teams on this league
			    $scope.teams = schedule.getTeams();
		    }

		    $scope.getGameResult = function(event) {

		    	var str = event.home + ' v ' + event.away; 
		    			
				if ($scope.manage) {
		    		str = "<a href='javascript:void(0)' onclick='enterResult()'>" + str + '</a>';

				} 
				str =str + '<br />' +
				' (' + event.result[0] +'-'+ event.result[1] + ') ';

				return str;

		    }

            
		    $scope.daySelected = {};

		    // the current controller will be reused at this point, no need to build a new one for now. 
		    // ******
		    $scope.enterResult = function(ahref, daySelected) {

		    	if (!$scope.manage) return false;

		    	//console.log(daySelected);
		    	$scope.daySelected = daySelected;
		    	$scope.ahref = ahref;

		    	//using ui-bootstrap
	            modalInstance = $modal.open({
			      templateUrl: 'views/modal_enter_result.html',
			      size: 'sm',
			      keyboard: true,
			      contoller: res,
			      scope: $scope, 
			      resolve : {

			      }
			      
			    });

		    }

		    //handles when the ok button on modal is pressed
		    $scope.ok = function() {

		    	$scope.ahref.html = $scope.daySelected.result[0] + '-' + $scope.daySelected.result[1];

		    	//window.alert('clicked me');
		    	modalInstance.close();

		    }

		    $scope.cancel = function() {
		    	modalInstance.dismiss('cancel');
		    }

		    // these two functions for compiling into memory, not quite work. form not fully showing
		    var onTemplate = function() {
                var modal = $templateCache.get('views/modal_result.html');
                //var lnk = $compile(modal)($scope)[0];
                //$document[0].body.append(lnk[1]);

                var modalElementTemplate = angular.element(modal);  
				var linkFn = $compile(modalElementTemplate[1]);  
				var modalElement = linkFn($scope);
				$document[0].body.appendChild(modalElement[2]);	
                
            };


		    $scope.enterResultWithCompile = function() {

		    	if ($templateCache.get('views/modal_result.html')) {
	               onTemplate();
	            } else {
	               $templateRequest('views/modal_result.html', true).then(onTemplate());
	            }

		    }

		    // ***********

	        /* $scope.getNumberArray = function(min, max, incrementAmount, fieldName) {
	          return rnDynamicFieldService.getNumberArray(min, max, incrementAmount, fieldName);
	        }; */

    	}],
    	link: function( scope, element, attrs, ctrl ) {

    	/* var input = element.find('input');
	      if( input == null ) {
	        input = element.find('select');
	      }
	      */

	      //if( input != null ) {
	        //input.attr('name', scope.field.tab_group_field.name);
	        //input.attr('id', scope.field.tab_group_field.name);

	        //$compile(input)(scope.$parent);
	      //}

	    }
  };

}

angular.module('yoFootballScheduleApp').directive('scheduledGames',
	['$compile','$templateCache','$templateRequest','$document',
	'$modal',ScheduledGames]);