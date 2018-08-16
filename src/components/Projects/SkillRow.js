import React, { Component } from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import * as PropTypes from 'prop-types';

export class SkillRow extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    skill: PropTypes.any
  };

  render() {
    let { skill, onChange, value } = this.props;
    return (
      <div className="row">
        <div className="col-2">{skill}</div>
        <div className="col-10 ">
          <ReactBootstrapSlider
            scale="logarithmic"
            value={value}
            change={onChange}
            step={1}
            max={100000}
            min={0}
          />
        </div>
      </div>
    );
  }
}
