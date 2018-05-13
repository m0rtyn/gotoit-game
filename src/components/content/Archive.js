
import React, { Component } from 'react';

import ProjectReport from '../ProjectReport';

class Archive extends Component {
    render() {
        return (
            <div key='archive_reports'>
                {this.props.data.projects_archive_reports.map((x, i) =>
                    <ProjectReport key={x.id} project={x} data={this.props.data} />
                )}
            </div>
        );
    }
}

export default Archive;