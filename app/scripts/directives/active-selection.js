function activeSelection (location) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs, ctrl) {
     
      var section = attrs.activeSelection;
      if (section=="/") section = "";
      var path = location.path(); //attrs.ngHref;
      scope.location = location;

      scope.$watch('location.path()', function(newPath) {
          
          elem.removeClass('active');
          
          if (newPath && newPath.length > 1) {
            newPath = newPath.substring(1);
          }
          var sections = newPath.split("/");

          if (_.contains(sections,section)) {
            elem.addClass('active');
          }
          /*
          if (newPath.indexOf(section)>=0) {
            elem.addClass('active');
          } 
          */
      });

      /*
      if (path.indexOf(section)>=0)
        elem.addClass('active');
      else 
        elem.removeClass('active');  
     */
    } 
    
  }
};

angular.module('yoFootballScheduleApp').directive('activeSelection', ['$location', activeSelection]);