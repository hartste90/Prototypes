
/*
    Useful function callbacks that should be defined at later time.
    Mainly to be used for specs to verify creation / linking.

    This is to lead a common design in notifying child stuff.
 */

(function() {
  angular.module("google-maps.directives.api.utils").factory("ChildEvents", function() {
    return {
      onChildCreation: function(child) {}
    };
  });

}).call(this);
