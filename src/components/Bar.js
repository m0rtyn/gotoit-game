import React, { Component } from 'react';
import _ from 'lodash';

class Bar extends Component {
  render() {
    let { bar_data } = this.props; //must be array!
    return (
      <div className={`progress ${this.props.className}`}>
        {_.map(bar_data, (item, i) => (
          <div
            key={i}
            className="progress-bar"
            role="progressbar"
            id={item.id}
            style={{
              width: item.width + '%',
              backgroundColor: item.color,
            }}
          >
            {item.showName ? item.name : null}
            {' ' + item.value}
          </div>
        ))}
      </div>
    );
  }
}

export default Bar;
