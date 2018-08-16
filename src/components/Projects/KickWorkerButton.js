import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

export class KickWorkerButton extends Component {
  render() {
    return (
      <span key={this.props.id}>
        <button
          className="btn btn-xs team-remove-worker"
          onClick={this.props.action}
        >
          {this.props.name}
        </button>
      </span>
    );
  }
}

KickWorkerButton.propTypes = {
  id: PropTypes.any,
  action: PropTypes.func,
  name: PropTypes.any
};
