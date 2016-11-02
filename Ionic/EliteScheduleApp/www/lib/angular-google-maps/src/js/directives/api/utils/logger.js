(function() {
  angular.module("google-maps.directives.api.utils").service("Logger", [
    "$log", function($log) {
      return {
        logger: $log,
        doLog: false,
        info: function(msg) {
          if (this.doLog) {
            if (this.logger != null) {
              return this.logger.info(msg);
            } else {
              return console.info(msg);
            }
          }
        },
        error: function(msg) {
          if (this.doLog) {
            if (this.logger != null) {
              return this.logger.error(msg);
            } else {
              return console.error(msg);
            }
          }
        },
        warn: function(msg) {
          if (this.doLog) {
            if (this.logger != null) {
              return this.logger.warn(msg);
            } else {
              return console.warn(msg);
            }
          }
        }
      };
    }
  ]);

}).call(this);
