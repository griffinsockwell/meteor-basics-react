Meteor.publish('elements', function() {
  let sort = { atNum: 1 };
  return Elements.find({}, { sort });
});
