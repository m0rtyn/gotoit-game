import React, { Component } from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';

export default class ProgressDeadline extends Component {
  static propTypes = {
    deadline: PropTypes.number,
    deadlineMax: PropTypes.number
  };

  render() {
    return (
      <div className="progress">
        <div
          className={classNames(
            'progress-bar',
            this.props.deadline / this.props.deadlineMax < 0.1
              ? 'bg-danger'
              : 'bg-warning'
          )}
          role="progressbar"
          style={{
            width:
              100 - (this.props.deadline / this.props.deadlineMax) * 100 + '%'
          }}
        >
          {this.props.deadlineMax - this.props.deadline} gone
        </div>
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{
            width: (this.props.deadline / this.props.deadlineMax) * 100 + '%'
          }}
        >
          {this.props.deadline} to deadline
        </div>
      </div>
    );
  }
}
