import React from 'react';

export default class Tooltip extends React.Component {
  render(){
    return (
      <div style={{ width: 100, height: 50, background: 'white', border: '1px solid black'}}>
        {this.props.children}
      </div>
    );
  }
}