import React, { Component } from 'react';

import Archive from './content/Archive.js';
import Exchange from './content/Exchange.js';
import Loans from '../components/content/Loans.js';
import MarketTop from '../components/content/MarketTop.js';
import ProjectsFind from '../components/content/ProjectsFind.js';
import StartMeeting from '../components/content/StartMeeting.js';
import StartProject from '../components/content/StartProject.js';
import Welcome from '../components/content/Welcome.js';

const components = {
    'Archive': Archive,
    'Exchange': Exchange,
    'Loans': Loans,
    'MarketTop': MarketTop,
    'ProjectsFind': ProjectsFind,
    'StartMeeting': StartMeeting,
    'StartProject': StartProject,
    'Welcome': Welcome,
};


class ContentContainer extends Component {

    render() {
        const ContentComponent = components[this.props.data.content];

        return (
            <div className="panel panel-success">
                <ContentComponent data={this.props.data} />
            </div>
        );
    }
}

export default ContentContainer;