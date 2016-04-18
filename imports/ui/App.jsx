import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Elements } from '../api/elements.js';

import Element from './Element.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { atNum: '', elName: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const atNum = this.state.atNum;
    const elName = this.state.elName.trim();

    Meteor.call('addElement', atNum, elName);

    this.setState({ atNum: '', elName: '' });
  }

  renderElements() {
    return this.props.elements.map((element) =>
      <Element element={element} key={element._id} />
    );
  }

  render() {
    let elementItem;

    if (this.props.elementsLoading) {
      elementItem = (<div className="loading">Loading...</div>);
    } else if (this.props.hasElements) {
      elementItem = (<ul>{this.renderElements()}</ul>);
    } else {
      elementItem = (<div className="no-elements">Add a new element above!</div>);
    }

    return (
      <div>
        <header>
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={(e) => this.setState({ atNum: e.target.value })}
              value={this.state.atNum}
              placeholder="Atomic Number"
              type="number"
              required
            />
            <input
              onChange={(e) => this.setState({ elName: e.target.value })}
              value={this.state.elName}
              placeholder="Element Name"
              type="text"
              autoComplete="off"
              required
            />
            <input className="submit" type="submit" value="Submit" />
          </form>
        </header>

        {elementItem}

      </div>
    );
  }
}

App.propTypes = {
  elementsLoading: PropTypes.bool,
  elements: PropTypes.array.isRequired,
  hasElements: PropTypes.bool.isRequired,
};

export default createContainer(() => {
  const handle = Meteor.subscribe('elements');
  const sort = { atNum: 1 };

  return {
    elementsLoading: !handle.ready(),
    elements: Elements.find({}, { sort }).fetch(),
    hasElements: Boolean(Elements.find().count()),
  };
}, App);
