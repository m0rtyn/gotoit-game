import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
const timelineWidth = window.innerWidth;

export class TimeLineStep extends Component {
  static propTypes = {
    day: PropTypes.any,
    events: PropTypes.arrayOf(PropTypes.any),
    f: PropTypes.func,
    index: PropTypes.number,
    length: PropTypes.number,
  };

  render() {
    return (
      <div
        key={this.props.index}
        className="step"
        style={{
          marginLeft:
            (timelineWidth / (this.props.length - 1)) * this.props.index + 'px',
        }}
      >
        <div>{this.props.day.getDate()}</div>

        <div className="worker-portrait">
          {_.map(this.props.events, this.props.f)}
        </div>
      </div>
    );
  }
}
