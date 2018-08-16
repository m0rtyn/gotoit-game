import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

export class ProjectReward extends Component {
  static propTypes = {
    penalty: PropTypes.number,
    reward: PropTypes.string
  };

  render() {
    let { reward, penalty } = this.props;
    return (
      <span>
        Reward: {reward}${penalty > 0 && <span> Penalty: {penalty}$ </span>}
      </span>
    );
  }
}
