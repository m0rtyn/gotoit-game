import React, { Component } from 'react';
import Portal from 'react-portal';

import SimpleModal from './SimpleModal';
import ProjectReport from './ProjectReport';
import ProjectsTop from '../services/ProjectsTop';

import {skills_names, project_platforms, project_kinds} from '../game/knowledge';


class ProjectEndScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //   end_screen_project: null
        };

    }

    render() {
        const data = this.props.data;
        let project = this.props.project;

        let all_top_handler = ProjectsTop.getHandler(data.simplified_reports);
        let platform_top_handler = all_top_handler.filter('platform', project.platform);
        let kind_top_handler = all_top_handler.filter('kind', project.kind);
        let platform_kind_top_handler = all_top_handler.filter('platform', project.platform).filter('kind', project.kind);

        return (
            <div className='flex-container-column'>
                <div>
                    <p><button className="btn btn-warning float-right" onClick={() => {
                        //data.helpers.projectArchiving();
                        this.props.closePopup();
                    }}>Close</button></p>
                </div>
                <div className="text-center">
                    <ProjectReport key={project.id} project={project} data={this.props.data} />
                    <div className="card border text-center">
                        <h3>Project Top Score</h3>
                        <h2>All Project Top: {all_top_handler.getTopNumber(project.id)}</h2>
                        <div className="flex-container-row">
                            {skills_names.map((skill) => <div key={skill} className="flex-element">
                                {skill} top: {all_top_handler.getTopNumber(project.id, skill)}
                            </div>)}
                        </div>
                        <h3>{project_platforms[project.platform].name} Top: {platform_top_handler.getTopNumber(project.id)}</h3>
                        <div className="flex-container-row">
                            {skills_names.map((skill) => <div key={skill} className="flex-element">
                                {skill} top: {platform_top_handler.getTopNumber(project.id, skill)}
                            </div>)}
                        </div>
                        <h3>{project_kinds[project.kind].name} Top: {kind_top_handler.getTopNumber(project.id)}</h3>
                        <div className="flex-container-row">
                            {skills_names.map((skill) => <div key={skill} className="flex-element">
                                {skill} top: {kind_top_handler.getTopNumber(project.id, skill)}
                            </div>)}
                        </div>
                        <h3>{project_platforms[project.platform].name} {project_kinds[project.kind].name} Top: {platform_kind_top_handler.getTopNumber(project.id)}</h3>
                        <div className="flex-container-row">
                            {skills_names.map((skill) => <div key={skill} className="flex-element">
                                {skill} top: {platform_kind_top_handler.getTopNumber(project.id, skill)}
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        )




    }
}

export default ProjectEndScreen;