import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { colors } from '../../game/knowledge';
import Bar from '../Bar/Bar';

export default class Deadline extends PureComponent {
  static propTypes = {
    deadline: PropTypes.number,
    deadlineMax: PropTypes.number
  };

  render() {
    let { deadline, deadlineMax } = this.props;
    if (
      deadline <= 0 ||
      deadlineMax <= 0 ||
      deadline === Number.POSITIVE_INFINITY
    )
      return null;

    const bar_data = [
      {
        name: 'gone',
        width: 100 - (deadline / deadlineMax) * 100,
        color: deadline / deadlineMax < 0.1 ? colors.danger : colors.warning,
        value: deadlineMax - deadline,
        showName: true
      },
      {
        name: 'to deadline',
        width: (deadline / deadlineMax) * 100,
        color: colors.success,
        value: deadline,
        showName: true
      }
    ];

    return (
      <div key="deadline" className="row">
        <div className="col-2">Deadline</div>
        <Bar bar_data={bar_data} />
      </div>
    );
  }
}
