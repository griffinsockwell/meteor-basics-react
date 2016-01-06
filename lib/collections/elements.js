Elements = new Mongo.Collection("elements");

Meteor.methods({
  addElement(atNum, elName) {
    atNum = parseInt(atNum);

    check(atNum, Number);
    check(elName, String);

    if (isFinite(atNum) && isNaN(elName)) {
      Elements.insert({ atNum, elName });
    }

  },
  removeElement(elId) {
    check(elId, String);

    const element = Elements.findOne(elId);

    Elements.remove(element);
  },
  updateElement(elId, atNum, elName) {
    atNum = parseInt(atNum);

    check(elId, String);
    check(atNum, Number);
    check(elName, String);

    const element = Elements.findOne(elId);

    if (isFinite(atNum) && isNaN(elName)) {
      Elements.update(element, { $set: { atNum, elName } });
    }

  }
});
