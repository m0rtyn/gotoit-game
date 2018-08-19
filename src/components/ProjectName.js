import React, { Component } from 'react';

import { project_sizes } from '../game/knowledge/projects';

class ProjectName extends Component {
  render() {
    const project = this.props.project;

    return (
      <h4 className="project-name flex-grow">
        {project_sizes[project.size].name} {project.platform} {project.kind}{' '}
        {project.name}
        <br />
        <span className="text-success">{project.reward}$</span>
        <span className="text-warning"> {project.getDeadlineText()}</span>
        <span>
          {project.penalty > 0 ? (
            <span className="text-danger"> {project.penalty}$</span>
          ) : (
            ''
          )}
        </span>
      </h4>
    );
  }
}

export default ProjectName;
