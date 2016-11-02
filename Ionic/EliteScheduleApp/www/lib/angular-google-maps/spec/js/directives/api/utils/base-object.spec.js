(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  describe("oo.BaseObject", function() {
    beforeEach(function() {
      module("google-maps.directives.api.utils");
      return inject((function(_this) {
        return function(BaseObject) {
          var Person, PersonAttributes, PersonModule;
          _this.subject = BaseObject;
          PersonModule = {
            changePersonName: function(person, name) {
              person.name = name;
              return person;
            },
            killPersonsName: function(person) {
              delete person.name;
              return person;
            }
          };
          PersonAttributes = {
            p_name: "no_name",
            state: "no_state"
          };
          _this.PersonAttributes = PersonAttributes;
          Person = (function(_super) {
            __extends(Person, _super);

            Person.include(PersonModule);

            Person.extend(PersonAttributes);

            function Person(name, state) {
              this.name = name != null ? name : Person.p_name;
              this.state = state != null ? state : Person.state;
            }

            return Person;

          })(BaseObject);
          _this.name = "nick";
          _this.state = "fl";
          _this.defaultUsage = new Person();
          return _this.usage = new Person(_this.name, _this.state);
        };
      })(this));
    });
    it("exists ~ you loaded the script!", function() {
      return expect(this.subject != null).toEqual(true);
    });
    describe("include specs", function() {
      it("defaults attributes exist", function() {
        expect(this.defaultUsage.name != null).toEqual(true);
        return expect(this.defaultUsage.name != null).toEqual(true);
      });
      it("defaults attributes are correct", function() {
        expect(this.defaultUsage.name).toEqual(this.PersonAttributes.p_name);
        return expect(this.defaultUsage.state).toEqual(this.PersonAttributes.state);
      });
      return it("subject attributes are correct ", function() {
        expect(this.usage.name).toEqual(this.name);
        return expect(this.usage.state).toEqual(this.state);
      });
    });
    return describe("extend specs", function() {
      it("defaults functions exist", function() {
        expect(this.defaultUsage.changePersonName != null).toEqual(true);
        return expect(this.defaultUsage.killPersonsName != null).toEqual(true);
      });
      return it("subject functions act correctly", function() {
        var p, p2;
        p = this.defaultUsage.changePersonName(angular.copy(this.defaultUsage), "john");
        p2 = this.defaultUsage.killPersonsName(this.defaultUsage);
        expect(p.name).toEqual("john");
        return expect(p2.name).toEqual(void 0);
      });
    });
  });

}).call(this);
