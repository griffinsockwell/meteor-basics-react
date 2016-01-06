App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let handle = Meteor.subscribe("elements");
    let sort = {
      atNum: 1
    };
    return {
      elementsLoading: !handle.ready(),
      elements: Elements.find({}, {sort}).fetch(),
      hasElements: Boolean(Elements.find().count())
    }
  },
  renderElements() {
    return this.data.elements.map((element) => {
      return <Element element={element} key={element._id}/>;
    });
  },
  handleSubmit(event) {
    event.preventDefault();

    let atNum = ReactDOM.findDOMNode(this.refs.atNum).value.trim();
    let elName = ReactDOM.findDOMNode(this.refs.elName).value.trim();

    Meteor.call('addElement', atNum, elName);

    ReactDOM.findDOMNode(this.refs.atNum).value = "";
    ReactDOM.findDOMNode(this.refs.elName).value = "";
  },
  render() {
    let elementItem;

    if (this.data.elementsLoading)
      elementItem = (
        <div className="loading">Loading...</div>
      )
    else if (this.data.hasElements)
      elementItem = (
        <ul>{this.renderElements()}</ul>
      )
    else
      elementItem = (
        <div className="no-elements">Add a new element above!</div>
      )

    return (
      <div>
        <header>
          <form onSubmit={this.handleSubmit}>
            <input placeholder="Atomic Number" ref="atNum" required type="number"/>
            <input placeholder="Element Name" ref="elName" required type="text"/>
            <input className="submit" type="submit" value="Submit"/>
          </form>
        </header>

        {elementItem}

      </div>
    );
  }
});
