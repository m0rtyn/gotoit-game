import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

export class Tests extends Component {
  static propTypes = {
    planedTasksQuantity: PropTypes.func,
    tests: PropTypes.number
  };

  render() {
    return (
      <div key="tests" className="row">
        <div className="col-2">Tests</div>
        <div className="col-10 progress">
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{
              width:
                100 -
                (this.props.tests / this.props.planedTasksQuantity()) * 100 +
                '%'
            }}
          >
            <span>
              {this.props.planedTasksQuantity() - this.props.tests} tasks
            </span>
          </div>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{
              width:
                (this.props.tests / this.props.planedTasksQuantity()) * 100 +
                '%'
            }}
          >
            {this.props.tests ? <span>{this.props.tests} done</span> : ''}
          </div>
        </div>
      </div>
    );
  }
}

Tests.propTypes = {
  tests: PropTypes.number,
  planedTasksQuantity: PropTypes.func
};
