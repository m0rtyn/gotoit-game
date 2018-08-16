import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

export class Statistics extends Component {
  render() {
    return (
      <div>
        <div> Iteration: {this.props.iteration} </div>
        <div>
          {' '}
          Tasks: {this.props.project.tasksQuantity()}/
          {this.props.project.planedTasksQuantity()}{' '}
        </div>
        <div>
          {' '}
          Bugs:{' '}
          <span className="text-danger">
            {this.props.project.bugsQuantity()}
          </span>
        </div>
        <div> Complexity: {this.props.complexity} </div>
      </div>
    );
  }
}

Statistics.propTypes = {
  iteration: PropTypes.any,
  project: PropTypes.any,
  complexity: PropTypes.any
};
