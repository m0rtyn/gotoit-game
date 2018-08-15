import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class RejectButton extends Component {
  static propTypes = {
    onClickRejectProject: PropTypes.func
  };

  render() {
    return (
      <button
        className="btn btn-danger"
        onClick={this.props.onClickRejectProject}
      >
        Reject
      </button>
    );
  }
}
