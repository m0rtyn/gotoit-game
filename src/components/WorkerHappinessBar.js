import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import _ from 'lodash';
import { colors } from '../game/knowledge';
import Bar from './Bar/Bar';

class WorkerHappinessBar extends Component {
  render() {
    let { worker } = this.props;
    //const sum = worker.calcEfficiencyReal();
    const bar_color = (() => {
      let ratio = worker.sum / 100;
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
    const happiness_array = worker.getEfficiencyArray();

    const bar_data = _.map(happiness_array, item => {
      return {
        name: item.name,
        width: item.value,
        color: bar_color,
        value: item.value,
        showName: false
      };
    });

    return <Bar className="happiness-bar" bar_data={bar_data} />;
  }
}

WorkerHappinessBar.propTypes = {};

export default WorkerHappinessBar;
