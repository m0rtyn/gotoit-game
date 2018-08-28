import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

export class StatsDataItem extends Component {
  render() {
    return (
      <div key={this.props.workerId + this.props.projectId}>
        <span style={{ width: '100%' }}>
          <input
            type="checkbox"
            id={this.props.workerId || ''}
            checked={this.props.relation(
              this.props.workerId,
              this.props.projectId,
              this.props.skill
            )}
            onChange={this.props.onChange}
          />
          {this.props.statsData}
        </span>
      </div>
    );
  }
}

StatsDataItem.propTypes = {
  workerId: PropTypes.any,
  projectId: PropTypes.any,
  relation: PropTypes.any,
  skill: PropTypes.any,
  onChange: PropTypes.func,
  statsData: PropTypes.any
};
