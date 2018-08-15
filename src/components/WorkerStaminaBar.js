import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { colors } from '../game/knowledge';
import Bar from './Bar/Bar';

class WorkerStaminaBar extends Component {
  render() {
    let { worker } = this.props;
    const bar_color = (() => {
      let ratio = worker.stamina / 100;
      switch (true) {
        case ratio <= 0.5:
          return colors.danger;
        case ratio <= 0.75:
          return colors.warning;
        case ratio <= 1:
          return colors.success;
        case ratio > 1:
          return colors.success; // High bonus
        default:
          break;
      }
    })();

    const bar_data = [
      {
        name: 'Stamina',
        width: Math.min(100, worker.stamina / 50),
        color: bar_color,
        value: `${Math.floor(worker.stamina / 50)}%`,
        showName: true,
      },
    ];

    return (
      <div>
        <Bar bar_data={bar_data} />
      </div>
    );
  }
}

WorkerStaminaBar.propTypes = {};

export default WorkerStaminaBar;
