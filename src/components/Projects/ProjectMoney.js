import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

export class ProjectMoney extends Component {
  render() {
    let { reward, penalty } = this.props;
    return (
      <div>
        <span className="project-reward text-success">Reward: {reward}$</span>
        {penalty > 0 ? (
          <span className="project-penalty text-warning">
            {' '}
            Penalty : {penalty}${' '}
          </span>
        ) : (
          ' '
        )}
      </div>
    );
  }
}

ProjectMoney.propTypes = {
  reward: PropTypes.any,
  project: PropTypes.any
};
