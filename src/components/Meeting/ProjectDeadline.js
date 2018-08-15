import React, { PureComponent } from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';

export default class ProjectDeadline extends PureComponent {
  static propTypes = {
    deadline: PropTypes.number.isRequired,
    deadlineMax: PropTypes.number.isRequired,
  };

  render() {
    return (
      <div key="deadline" className="row">
        <div className="col-md-2">Deadline</div>
        <div className="col-md-10 progress">
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
                100 -
                (this.props.deadline / this.props.deadlineMax) * 100 +
                '%',
            }}
          >
            {this.props.deadlineMax - this.props.deadline} hours
          </div>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{
              width: (this.props.deadline / this.props.deadlineMax) * 100 + '%',
            }}
          >
            {this.props.deadline} hours
          </div>
        </div>
      </div>
    );
  }
}
