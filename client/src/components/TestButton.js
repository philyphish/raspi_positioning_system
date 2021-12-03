import React from "react";

function deleteHandler() {
  fetch("/test");
}

class TestButton extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <div>
        <button onClick={deleteHandler}>{this.props.name}</button>
      </div>
    );
  }
}

export default TestButton;
