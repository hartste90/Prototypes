(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api").factory("Marker", [
    "IMarker", "MarkerParentModel", "MarkerManager", function(IMarker, MarkerParentModel, MarkerManager) {
      var Marker;
      return Marker = (function(_super) {
        __extends(Marker, _super);

        function Marker($timeout) {
          this.link = __bind(this.link, this);
          var self;
          Marker.__super__.constructor.call(this, $timeout);
          self = this;
          this.template = '<span class="angular-google-map-marker" ng-transclude></span>';
          this.$log.info(this);
        }

        Marker.prototype.controller = [
          '$scope', '$element', function($scope, $element) {
            return {
              getMarkerScope: function() {
                return $scope;
              }
            };
          }
        ];

        Marker.prototype.link = function(scope, element, attrs, ctrl) {
          var doFit;
          if (scope.fit) {
            doFit = true;
          }
          if (!this.gMarkerManager) {
            this.gMarkerManager = new MarkerManager(ctrl.getMap());
          }
          return new MarkerParentModel(scope, element, attrs, ctrl, this.$timeout, this.gMarkerManager, doFit);
        };

        return Marker;

      })(IMarker);
    }
  ]);

}).call(this);
