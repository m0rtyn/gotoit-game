import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BarItem from './BarItem';
import _ from 'lodash';

class Bar extends Component {
  static defaultProps = {
    className: ''
  };

  static propTypes = {
    bar_data: PropTypes.array.isRequired
    //className: PropTypes.string.isRequired
  };

  render() {
    let { bar_data } = this.props; //must be array!
    return (
      <div className={`progress ${this.props.className}`}>
        {_.map(bar_data, (item, i) => {
          const {
            id,
            name = '',
            showName = false,
            color = '#fff',
            value = 0,
            width = 0
          } = item;
          return (
            <BarItem
              key={`${id}-${name}`}
              showName={showName}
              color={color}
              name={name}
              value={value}
              width={width}
            />
          );
        })}
      </div>
    );
  }
}

export default Bar;
