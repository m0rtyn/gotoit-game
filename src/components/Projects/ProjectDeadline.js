import React, { Component } from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';

export class ProjectDeadline extends Component {
  static propTypes = {
    deadline: PropTypes.number,
    deadlineMax: PropTypes.number
  };

  render() {
    let { deadline, deadlineMax } = this.props;
    if (deadline <= 0 || deadline === Number.POSITIVE_INFINITY) return null;
    return (
      <div key="deadline" className="row">
        <div className="col-2">Deadline</div>
        <div className="col-10 progress">
          <div
            className={classNames(
              'progress-bar',
              deadline / deadlineMax < 0.1 ? 'bg-danger' : 'bg-warning'
            )}
            role="progressbar"
            style={{
              width: 100 - (deadline / deadlineMax) * 100 + '%'
            }}
          >
            <span>{deadlineMax - deadline} hours</span>
          </div>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{
              width: (deadline / deadlineMax) * 100 + '%'
            }}
          >
            <span>{deadline} hours</span>
          </div>
        </div>
      </div>
    );
  }
}
