import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

export class ReleaseButton extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    doneQuantity: PropTypes.any,
    stage: PropTypes.any,
    type: PropTypes.any
  };

  render() {
    let { onClick, type, stage, doneQuantity } = this.props;
    if (!(doneQuantity > 0 && type === 'own' && stage !== 'fixing'))
      return null;
    return (
      <button className="btn btn-success" onClick={onClick}>
        Release!
      </button>
    );
  }
}
