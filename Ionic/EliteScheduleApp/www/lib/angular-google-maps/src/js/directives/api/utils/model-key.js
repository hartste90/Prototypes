(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.utils").factory("ModelKey", [
    "BaseObject", function(BaseObject) {
      var ModelKey;
      return ModelKey = (function(_super) {
        __extends(ModelKey, _super);

        function ModelKey(scope) {
          this.scope = scope;
          this.setIdKey = __bind(this.setIdKey, this);
          this.modelKeyComparison = __bind(this.modelKeyComparison, this);
          ModelKey.__super__.constructor.call(this);
          this.defaultIdKey = "id";
          this.idKey = void 0;
        }

        ModelKey.prototype.evalModelHandle = function(model, modelKey) {
          if (model === void 0) {
            return void 0;
          }
          if (modelKey === 'self') {
            return model;
          } else {
            return model[modelKey];
          }
        };

        ModelKey.prototype.modelKeyComparison = function(model1, model2) {
          var scope;
          scope = this.scope.coords != null ? this.scope : this.parentScope;
          if (scope == null) {
            throw "No scope or parentScope set!";
          }
          return this.evalModelHandle(model1, scope.coords).latitude === this.evalModelHandle(model2, scope.coords).latitude && this.evalModelHandle(model1, scope.coords).longitude === this.evalModelHandle(model2, scope.coords).longitude;
        };

        ModelKey.prototype.setIdKey = function(scope) {
          return this.idKey = scope.idKey != null ? scope.idKey : this.defaultIdKey;
        };

        return ModelKey;

      })(BaseObject);
    }
  ]);

}).call(this);
