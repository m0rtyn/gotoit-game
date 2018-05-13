import React, { Component } from 'react';

import Meeting from './Meeting';
import Project from './Project';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {show_archive: true};
    }

    render() {
        return (
            <div>
                <h4 className="text-center slim-top"><label>Your Projects</label></h4>
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
            </div>
        );
    }
}

export default Projects;
