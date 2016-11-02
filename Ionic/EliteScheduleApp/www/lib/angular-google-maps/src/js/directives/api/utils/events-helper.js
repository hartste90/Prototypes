(function() {
  angular.module("google-maps.directives.api.utils").service("EventsHelper", [
    "Logger", function($log) {
      return {
        setEvents: function(marker, scope, model) {
          if (angular.isDefined(scope.events) && (scope.events != null) && angular.isObject(scope.events)) {
            return _.compact(_.map(scope.events, function(eventHandler, eventName) {
              if (scope.events.hasOwnProperty(eventName) && angular.isFunction(scope.events[eventName])) {
                return google.maps.event.addListener(marker, eventName, function() {
                  return eventHandler.apply(scope, [marker, eventName, model, arguments]);
                });
              } else {
                return $log.info("MarkerEventHelper: invalid event listener " + eventName);
              }
            }));
          }
        }
      };
    }
  ]);

}).call(this);
