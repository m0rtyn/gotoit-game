import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

const ProgressBar = styled.div`
  background-color: ${props => props.color};
  width: ${props => props.width}%;
`;

class BarItem extends PureComponent {
  static defaultProps = {
    width: 0
  };

  static propTypes = {
    color: PropTypes.string,
    name: PropTypes.string,
    showName: PropTypes.bool,
    value: PropTypes.string,
    width: PropTypes.number
  };

  render() {
    let { showName, name, value = 0, color, width = 0 } = this.props;
    return (
      <ProgressBar
        color={color}
        width={width}
        className="progress-bar"
        role="progressbar"
      >
        {showName ? name : null}
        {' ' + value.toString()}
      </ProgressBar>
    );
  }
}

export default BarItem;
