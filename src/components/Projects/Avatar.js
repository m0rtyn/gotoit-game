import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

export class Avatar extends Component {
  render() {
    return (
      <div className="project-avatar">
        <img
          className="project-avatar"
          alt={this.props.name + ' avatar'}
          src={this.props.avatar && this.props.avatar.platform}
        />
        <img
          className="project-avatar"
          alt={this.props.name + ' avatar'}
          src={this.props.avatar && this.props.avatar.kind}
        />
      </div>
    );
  }
}

Avatar.propTypes = {
  name: PropTypes.any,
  avatar: PropTypes.any
};
