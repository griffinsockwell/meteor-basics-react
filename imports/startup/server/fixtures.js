import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import { Elements } from '../../api/elements.js';

Meteor.startup(() => {
  const elements = [{
    atNum: 1,
    elName: 'Hydrogen',
  }, {
    atNum: 2,
    elName: 'Helium',
  }, {
    atNum: 3,
    elName: 'Lithium',
  }, {
    atNum: 4,
    elName: 'Beryllium',
  }, {
    atNum: 5,
    elName: 'Boron',
  }];

  if (Elements.find().count() === 0) {
    _.each(elements, (element) => {
      Elements.insert({
        atNum: element.atNum,
        elName: element.elName,
      });
    });
  }
});
