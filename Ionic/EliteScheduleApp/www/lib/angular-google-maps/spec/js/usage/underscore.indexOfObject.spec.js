(function() {
  describe("_.indexOfObject", function() {
    beforeEach(function() {
      return this.objArray = [
        {
          a: 1,
          b: 1
        }, {
          a: 2,
          b: 2
        }, {
          a: 5,
          b: 3
        }, {
          a: 3,
          b: 3
        }
      ];
    });
    it("finds first element", function() {
      var i;
      i = _.indexOfObject(this.objArray, {
        a: 1,
        b: 1
      });
      return expect(i).toEqual(0);
    });
    it("finds element beginning", function() {
      var i;
      i = _.indexOfObject(this.objArray, {
        a: 2,
        b: 2
      });
      return expect(i).toEqual(1);
    });
    it("finds last element", function() {
      var i;
      i = _.indexOfObject(this.objArray, {
        a: 5,
        b: 3
      });
      return expect(i).toEqual(2);
    });
    it("finds last element", function() {
      var i;
      i = _.indexOfObject(this.objArray, {
        a: 3,
        b: 3
      });
      return expect(i).toEqual(3);
    });
    return it("find no element", function() {
      var i;
      i = _.indexOfObject(this.objArray, {
        a: 4,
        b: 3
      });
      return expect(i).toEqual(-1);
    });
  });

}).call(this);
