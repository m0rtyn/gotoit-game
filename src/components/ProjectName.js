import React, { Component } from 'react';


import {project_sizes} from '../game/knowledge';

class ProjectName extends Component {
    render() {
        const project = this.props.project;

        return (
            <h4 className="project-name">
                {project_sizes[project.size].name} {project.platform} {project.kind} {project.name}
            </h4>
        );
    }
}

export default ProjectName;
