import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Element extends Component {
  constructor(props) {
    super(props);

    this.state = { atNum: '', elName: '', editing: false };
    this.deleteElement = this.deleteElement.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  deleteElement() {
    Meteor.call('removeElement', this.props.element._id);
  }

  handleSubmit(event) {
    event.preventDefault();

    const atNum = this.state.atNum;
    const elName = this.state.elName.trim();

    Meteor.call('updateElement', this.props.element._id, atNum, elName);

    this.setState({ editing: false });
  }

  render() {
    let elementItem;

    if (this.state.editing) {
      elementItem = (
        <div>
          <button
            onClick={() => this.setState({ editing: false })}
            className="cancel"
          >Cancel</button>
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={(e) => this.setState({ atNum: e.target.value })}
              defaultValue={this.props.element.atNum}
              placeholder="Atomic Number"
              type="number"
              required
            />
            <input
              onChange={(e) => this.setState({ elName: e.target.value })}
              defaultValue={this.props.element.elName}
              placeholder="Element Name"
              type="text"
              autoComplete="off"
              required
            />
            <input className="save" type="submit" value="Save" />
          </form>
        </div>
      );
    } else {
      elementItem = (
        <div>
          <button
            onClick={() => this.setState({ editing: true })}
            className="update"
          >Update</button>
          <span>{this.props.element.atNum}</span>
          <span>{this.props.element.elName}</span>
          <button className="delete" onClick={this.deleteElement}>Delete</button>
        </div>
      );
    }

    return (
      <li>{elementItem}</li>
    );
  }
}

Element.propTypes = {
  element: PropTypes.object.isRequired,
};
