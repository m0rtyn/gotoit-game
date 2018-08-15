import { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import React from 'react';
import * as PropTypes from 'prop-types';

export default class DeadLine extends Component {
  static propTypes = {
    avatar: PropTypes.string,
    index: PropTypes.number,
    info: PropTypes.string,
    name: PropTypes.string,
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
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute' }}>
            <img
              alt={this.props.name + ' platform'}
              src={this.props.avatar.platform}
              width={20}
              height={20}
            />
          </div>
          <div style={{ position: 'absolute' }}>
            <img
              alt={this.props.name + ' kind'}
              src={this.props.avatar.kind}
              width={20}
              height={20}
            />
          </div>
        </div>
      </OverlayTrigger>
    );
  }
}
