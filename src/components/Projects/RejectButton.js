import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

export class RejectButton extends Component {
  static propTypes = {
    onClick: PropTypes.func
  };
  render() {
    return (
      <button className="btn btn-sm btn-danger" onClick={this.props.onClick}>
        Reject
      </button>
    );
  }
}

RejectButton.propTypes = { onClick: PropTypes.func };
