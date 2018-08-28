import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';

export default class StartPauseButton extends PureComponent {
  static propTypes = {
    open: PropTypes.func,
    pause: PropTypes.func,
    paused: PropTypes.bool,
    stage: PropTypes.bool,
    unpause: PropTypes.func
  };

  render() {
    return (
      <span>
        {/*{project.stage}*/}
        {this.props.paused ? (
          <button className="btn btn-success" onClick={this.props.onUnpause}>
            Start
          </button>
        ) : (
          ''
        )}
        {this.props.stage === 'ready' ? (
          <button className="btn btn-success" onClick={this.props.onOpen}>
            Start
          </button>
        ) : (
          ''
        )}
        {this.props.stage === 'open' && !this.props.paused ? (
          <button className="btn btn-warning" onClick={this.props.onPause}>
            Pause
          </button>
        ) : (
          ''
        )}
      </span>
    );
  }
}
