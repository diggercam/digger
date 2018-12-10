import React, { Component } from 'react';

class Thumbnail extends Component {
  render() {
    return (
      <img src={this.props.coverUrl} className="cover" alt="logo" />
    );
  }
}

export default Thumbnail;
