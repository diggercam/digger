import React, { Component } from 'react';

class Thumbnail extends Component {
  render() {
    return (
      <i className={`navButton fa fa-angle-double-${this.props.direction}`} aria-hidden="true"></i>
    );
  }
}

export default Thumbnail;
