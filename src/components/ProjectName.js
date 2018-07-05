import React, { Component } from 'react';


import {project_sizes} from '../game/knowledge';

class ProjectName extends Component {
    render() {
        const project = this.props.project;
        //console.log(project);
        return (
            <span>
                {project_sizes[project.size].name} {project.platform} {project.kind} {project.name} {`($${project.reward})`}
            </span>
        );
    }
}

export default ProjectName;
