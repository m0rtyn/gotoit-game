import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { project_sizes } from '../../game/knowledge';

class ProjectName extends Component {
  static defaultProps = {
    size: 0
  };

  static propTypes = {
    deadlineText: PropTypes.string,
    kind: PropTypes.string,
    name: PropTypes.string,
    penalty: PropTypes.number,
    platform: PropTypes.string,
    reward: PropTypes.string,
    size: PropTypes.number
  };

  render() {
    const {
      size,
      platform,
      kind,
      name,
      reward,
      penalty,
      deadlineText
    } = this.props;
    return (
      <h4 className="project-name flex-grow">
        {project_sizes[size].name} {platform} {kind} {name}
        <br />
        <span className="text-success">{reward}$</span>
        <span className="text-warning"> {deadlineText}</span>
        <span>
          {penalty > 0 ? <span className="text-danger"> {penalty}$</span> : ''}
        </span>
      </h4>
    );
  }
}

export default ProjectName;
