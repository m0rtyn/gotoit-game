import { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import React from 'react';

export default class VacationAndLeave extends Component {
  static propTypes = {
    avatar: PropTypes.string,
    index: PropTypes.number,
    info: PropTypes.string,
    name: PropTypes.string
  };

  render() {
    return (
      <OverlayTrigger
        key={this.props.index}
        delay={150}
        placement="bottom"
        overlay={
          <Tooltip id={`Tooltip${this.props.index}`}>
            <div>{this.props.info + ': ' + this.props.name}</div>
          </Tooltip>
        }
      >
        <img
          className="worker-portrait"
          src={this.props.avatar}
          role="presentation"
        />
      </OverlayTrigger>
    );
  }
}
