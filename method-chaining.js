/**
 * create a factory design pattern that allows users to calculate a sum of numbers through method chaning
 * e.g :
 * calculateValue()
 * .lacks(4)
 * .crores(3)
 * .thousand(4)
 * .value()
 *
 *  returns => 30404000
 */

function calculateValue() {
  let sum =  0;
  return {
    lacks: function (value) {
      sum += value * 1_00_000;
      return this;
    },
    thousand: function (value) {
      sum += value * 1000;
      return this;
    },
    crores: function (value) {
      sum += value * 1_00_00_000;
      return this;
    },
    value: function () {
      console.log(sum);
    },
  };
}
calculateValue().lacks(3).crores(4).thousand(5).thousand(2).value();


// /////////////////////////// OR  //////////////////////////////////////////////////


function calculateValue() {
    let sum = 0;
    console.log(this);

    this.thousand = function(value) {
        sum += value * 1000;
        return this;
    }

    this.lacks = function(value) {
        sum += value * 1_00_000;
        return this;
    }

    this.value = function() {
        return sum;
    }
}

console.log(new calculateValue().thousand(30).lacks(4));