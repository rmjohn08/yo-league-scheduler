angular.module('yoFootballScheduleApp').directive("notification", 
	function($rootScope, $timeout) {
	return {
		replace : true,
		template: [
		"<div class='alert alert-success' ng-show='notification.visible'>{{ notification.message}}</div>"
		].join(""),
		link: function(scope, el, attrs) {
			scope.notification = {message : false, visible: false };
			$rootScope.$on("notify", function(event, message) {
				scope.notification.message = message;
				scope.notification.visible = true;
				$timeout(function() {
					scope.notification.visible = false;

				}, 1500);
			});
		}

	}
});