
/*
    Simple Object Map with a lenght property to make it easy to track length/size
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module("google-maps.directives.api.utils").factory("PropMap", function() {
    var PropMap, propsToPop;
    propsToPop = ['get', 'put', 'remove', 'values', 'keys', 'length'];
    PropMap = (function() {
      function PropMap() {
        this.keys = __bind(this.keys, this);
        this.values = __bind(this.values, this);
        this.remove = __bind(this.remove, this);
        this.put = __bind(this.put, this);
        this.get = __bind(this.get, this);
        this.length = 0;
      }

      PropMap.prototype.get = function(key) {
        return this[key];
      };

      PropMap.prototype.put = function(key, value) {
        if (this[key] == null) {
          this.length++;
        }
        return this[key] = value;
      };

      PropMap.prototype.remove = function(key) {
        delete this[key];
        return this.length--;
      };

      PropMap.prototype.values = function() {
        var all, keys;
        all = [];
        keys = _.keys(this);
        _.each(keys, (function(_this) {
          return function(value) {
            if (_.indexOf(propsToPop, value) === -1) {
              return all.push(_this[value]);
            }
          };
        })(this));
        return all;
      };

      PropMap.prototype.keys = function() {
        var all, keys;
        keys = _.keys(this);
        all = [];
        _.each(keys, (function(_this) {
          return function(prop) {
            if (_.indexOf(propsToPop, prop) === -1) {
              return all.push(prop);
            }
          };
        })(this));
        return all;
      };

      return PropMap;

    })();
    return PropMap;
  });

}).call(this);
