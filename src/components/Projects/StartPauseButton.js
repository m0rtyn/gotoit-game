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
    const { paused, stage, onUnpause, onOpen, onPause } = this.props;
    return (
      <span>
        {/*{project.stage}*/}
        {paused && (
          <button className="btn btn-sm btn-success" onClick={onUnpause}>
            Start
          </button>
        )}
        {stage === 'ready' && (
          <button className="btn btn-sm btn-success" onClick={onOpen}>
            Start
          </button>
        )}
        {stage === 'open' &&
          !paused && (
            <button className="btn btn-sm btn-warning" onClick={onPause}>
              Pause
            </button>
          )}
      </span>
    );
  }
}
