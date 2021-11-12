import React from "react";

function deleteHandler() {
  alert("Hello!");
}

class TestButton extends React.Component {
  render() {
    const { name } = this.props;
    return <button onClick={deleteHandler}>{this.props.name}</button>;
  }
}

export default TestButton;
