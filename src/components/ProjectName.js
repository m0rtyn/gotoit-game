import React, { Component } from 'react';


import {project_sizes} from '../game/knowledge';

class ProjectName extends Component {
    render() {
        const project = this.props.project;
        //console.log(project);
        return (
            <h3 className="project-name">
                {project_sizes[project.size].name} {project.platform} {project.kind} {project.name} {`($${project.reward})`}
            </h3>
        );
    }
}

export default ProjectName;
