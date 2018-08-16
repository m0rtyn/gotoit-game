import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

export class StartPauseButton extends Component {
  static propTypes = {
    onOpen: PropTypes.func,
    onPause: PropTypes.func,
    onUnpause: PropTypes.func,
    paused: PropTypes.bool,
    stage: PropTypes.any
  };

  render() {
    return (
      <span>
        {/*{project.stage}*/}
        {this.props.paused ? (
          <button
            className="btn btn-sm btn-success"
            onClick={this.props.onUnpause}
          >
            Start
          </button>
        ) : (
          ''
        )}
        {this.props.stage === 'ready' ? (
          <button
            className="btn btn-sm btn-success"
            onClick={this.props.onOpen}
          >
            Start
          </button>
        ) : (
          ''
        )}
        {this.props.stage === 'open' && !this.props.paused ? (
          <button
            className="btn btn-sm btn-warning"
            onClick={this.props.onPause}
          >
            Pause
          </button>
        ) : (
          ''
        )}
      </span>
    );
  }
}

StartPauseButton.propTypes = {
  paused: PropTypes.bool,
  onUnpause: PropTypes.func,
  stage: PropTypes.any,
  onOpen: PropTypes.func,
  onPause: PropTypes.func
};
