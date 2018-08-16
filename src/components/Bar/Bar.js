import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BarItem from './BarItem';
import _ from 'lodash';

class Bar extends Component {
  static defaultProps = {
    className: ''
  };

  static propTypes = {
    bar_data: PropTypes.array.isRequired,
    className: PropTypes.string.isRequired
  };

  render() {
    let { bar_data } = this.props; //must be array!
    return (
      <div className={`progress ${this.props.className}`}>
        {_.map(bar_data, (item, i) => (
          <BarItem
            key={`${item.id}-${item.name}`}
            showName={item.showName}
            color={item.color}
            name={item.name}
            value={item.value}
            width={item.width}
          />
        ))}
      </div>
    );
  }
}

export default Bar;
