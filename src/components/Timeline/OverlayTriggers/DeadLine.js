import { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import React from 'react';
import * as PropTypes from 'prop-types';
import { Avatar } from '../../Projects/Avatar';

export default class DeadLine extends Component {
  static propTypes = {
    avatar: PropTypes.shape(),
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
        <div style={{ position: 'relative' }}>
          <Avatar
            name={this.props.name}
            platform={this.props.avatar.platform}
            kind={this.props.avatar.kind}
            style={{ position: 'absolute' }}
            size={20}
          />
        </div>
      </OverlayTrigger>
    );
  }
}
