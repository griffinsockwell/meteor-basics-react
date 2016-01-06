Element = React.createClass({
  propTypes: {
    element: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return {editing: false}
  },
  cancelUpdate() {
    this.setState({editing: false});
  },
  updatingElement() {
    this.setState({editing: true});
  },
  deleteElement() {
    if (confirm("Are you sure you want to delete this element?")) {
      Meteor.call('removeElement', this.props.element._id);
    }
  },
  handleSubmit(event) {
    event.preventDefault();

    let atNum = ReactDOM.findDOMNode(this.refs.atNum).value.trim();
    let elName = ReactDOM.findDOMNode(this.refs.elName).value.trim();

    Meteor.call('updateElement', this.props.element._id, atNum, elName);

    this.setState({editing: false});
  },
  render() {
    let elementItem;

    if (this.state.editing)
      elementItem = (
        <div>
          <button className="cancel" onClick={this.cancelUpdate}>Cancel</button>
          <form onSubmit={this.handleSubmit}>
            <input defaultValue={this.props.element.atNum} placeholder="Atomic Number" ref="atNum" required type="number"/>
            <input defaultValue={this.props.element.elName} placeholder="Element Name" ref="elName" required type="text"/>
            <input className="save" type="submit" value="Save"/>
          </form>
        </div>
      )
    else
      elementItem = (
        <div>
          <button className="update" onClick={this.updatingElement}>Update</button>
          <span>{this.props.element.atNum}</span>
          <span>{this.props.element.elName}</span>
          <button className="delete" onClick={this.deleteElement}>Delete</button>
        </div>
      )

    return (
      <li>{elementItem}</li>
    );
  }
});
