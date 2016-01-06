Meteor.startup(function() {
  if (Elements.find().count() === 0) {
    var elements = [{
      atNum: 1,
      elName: "Hydrogen"
    }, {
      atNum: 2,
      elName: "Helium"
    }, {
      atNum: 3,
      elName: "Lithium"
    }, {
      atNum: 4,
      elName: "Beryllium"
    }, {
      atNum: 5,
      elName: "Boron"
    }];

    _.each(elements, function(element) {
      Elements.insert({
        atNum: element.atNum,
        elName: element.elName
      });
    });
  }
});
