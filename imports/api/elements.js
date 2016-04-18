import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Elements = new Mongo.Collection('elements');

if (Meteor.isServer) {
  Meteor.publish('elements', () => {
    const sort = { atNum: 1 };
    return Elements.find({}, { sort });
  });
}

Meteor.methods({
  addElement(atomicNumber, elementName) {
    const atNum = parseInt(atomicNumber, 10);
    const elName = elementName;

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
  updateElement(elId, atomicNumber, elementName) {
    const atNum = parseInt(atomicNumber, 10);
    const elName = elementName;

    check(elId, String);
    check(atNum, Number);
    check(elName, String);

    const element = Elements.findOne(elId);

    if (isFinite(atNum) && isNaN(elName)) {
      Elements.update(element, { $set: { atNum, elName } });
    }
  },
});
