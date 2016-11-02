(function() {
  angular.module("google-maps.directives.api.utils").factory("ModelsWatcher", [
    "Logger", function(Logger) {
      return {
        figureOutState: function(idKey, scope, childObjects, comparison, callBack) {
          var adds, mappedScopeModelIds, removals;
          adds = [];
          mappedScopeModelIds = {};
          removals = [];
          return _async.each(scope.models, function(m) {
            var child;
            if (m[idKey] != null) {
              mappedScopeModelIds[m[idKey]] = {};
              if (childObjects[m[idKey]] == null) {
                return adds.push(m);
              } else {
                child = childObjects[m[idKey]];
                if (!comparison(m, child.model)) {
                  adds.push(m);
                  return removals.push(child);
                }
              }
            } else {
              return Logger.error("id missing for model " + (m.toString()) + ", can not use do comparison/insertion");
            }
          }, (function(_this) {
            return function() {
              return _async.each(childObjects.values(), function(c) {
                var id;
                if (c == null) {
                  Logger.error("child undefined in ModelsWatcher.");
                  return;
                }
                if (c.model == null) {
                  Logger.error("child.model undefined in ModelsWatcher.");
                  return;
                }
                id = c.model[idKey];
                if (mappedScopeModelIds[id] == null) {
                  return removals.push(c);
                }
              }, function() {
                return callBack({
                  adds: adds,
                  removals: removals
                });
              });
            };
          })(this));
        }
      };
    }
  ]);

}).call(this);
