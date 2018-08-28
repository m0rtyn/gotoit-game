import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';

export class Avatar extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    kind: PropTypes.string,
    name: PropTypes.string,
    platform: PropTypes.string,
    size: PropTypes.number,
    style: PropTypes.object
  };

  render() {
    let props = {};
    if (this.props.size) {
      props = {
        ...props,
        width: this.props.size,
        height: this.props.size
      };
    }
    if (this.props.style) {
      props = {
        ...props,
        style: this.props.style
      };
    }
    if (this.props.className) {
      props = {
        ...props,
        className: this.props.className
      };
    }
    return (
      <>
        <img
          alt={this.props.name + ' avatar'}
          src={this.props.platform}
          {...props}
        />
        <img
          alt={this.props.name + ' avatar'}
          src={this.props.kind}
          {...props}
        />
      </>
    );
  }
}
