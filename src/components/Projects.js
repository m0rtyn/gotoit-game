import React, { Component } from 'react';
import MarketTop from './MarketTop';

import StartProject from './StartProject';
import StartMeeting from './StartMeeting';
import Meeting from './Meeting';
import ProjectsFind from './ProjectsFind';
import Project from './Project';
import ProjectReport from './ProjectReport';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {show_archive: true};
    }

    render() {
        return (
            <div>
                <div className="flex-container-row">
                    <span className="flex-element">
                        <StartProject data={this.props.data} />
                    </span>
                    <span className="flex-element">
                        <StartMeeting data={this.props.data} />
                    </span>
                    <span className="flex-element">
                        <ProjectsFind data={this.props.data} />
                    </span>
                    <span className="flex-element hidden"> <label> or </label> <button className="btn btn-info" onClick={this.props.data.helpers.draftProject}>Invent Startup</button></span>
                </div>
                <div>
                    {this.props.data.projects.length ?
                        <div>
                            {this.props.data.projects.map((meeting, i) => meeting.type === 'meeting' ?
                                <Meeting key={meeting.id} project={meeting} data={this.props.data} /> : ''
                            )}
                        </div>
                        : '' }
                </div>
                <div>
                    {this.props.data.projects.length ?
                        <div>
                            {this.props.data.projects.map((project, i) => project.type !== 'meeting' ?
                                <Project key={project.id} project={project} data={this.props.data} /> : ''
                            )}
                        </div>
                        : <div className="text-center fat">You have no projects in progress.</div> }
                </div>
                <div>
                    {this.props.data.projects_archive_reports.length > 0 ?
                        <div key='projects_archive_reports'>
                            <div className="flex-container-row">
                                <h4 className="flex-element">Archived Projects</h4>
                                <span className="flex-element">
                                    <button className="btn btn-warning" onClick={() => {this.setState({show_archive: !this.state.show_archive});}}>
                                        {this.state.show_archive ? 'Hide' : 'Show'} Archive
                                    </button>
                                </span>
                                <span className="flex-element"><MarketTop data={this.props.data} /></span>
                            </div>
                            {this.state.show_archive ?
                                <div key='archive_reports'>
                                    {this.props.data.projects_archive_reports.map((x, i) =>
                                        <ProjectReport key={x.id} project={x} data={this.props.data} />
                                    )}
                                </div>
                            : ''}
                        </div>
                    : ''}
                </div>
            </div>
        );
    }
}

export default Projects;
