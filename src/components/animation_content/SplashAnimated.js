import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

class SplashAnimated extends Component {
  transitionEnd = () => {
    this.props.handleTransitionEnd();
  };
  render() {
    let { target, size, color } = this.props;
    return (
      <Motion
        defaultStyle={{ scale: 0, opacity: 1 }}
        style={{ scale: spring(2), opacity: spring(0) }}
      >
        {({ scale, opacity }) => {
          if (scale === 2) {
            this.transitionEnd();
            return null;
          } else
            return (
              <div
                style={{
                  width: size,
                  height: size,
                  background: color,
                  opacity: opacity,
                  transform: `translate3d(${target.x}px, ${
                    target.y
                  }px, 0) scale(${scale})`,
                  WebkitTransform: `translate3d(${target.x}px, ${
                    target.y
                  }px, 0) scale(${scale})`,
                  borderRadius: '50%',
                  position: 'absolute',
                  lineHeight: size,
                  zIndex: 10,
                }}
              />
            );
        }}
      </Motion>
    );
  }
}

SplashAnimated.propTypes = {
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  target: PropTypes.object.isRequired,
  handleTransitionEnd: PropTypes.func.isRequired,
};

export default SplashAnimated;
