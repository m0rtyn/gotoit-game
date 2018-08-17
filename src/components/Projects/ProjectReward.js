import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';

export class ProjectReward extends PureComponent {
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
