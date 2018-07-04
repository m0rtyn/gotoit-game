import React, { Component } from 'react';

import _ from 'lodash';

import Creation from './Creation';
import ProjectEndScreen from './ProjectEndScreen';
import HotOffer from './HotOffer';

class PopupsNest extends Component {
    render() {
        const data = this.props.data;

        let end_screen_project = null;
        if (data.projects_end_reports.length > 0) {
            end_screen_project = data.projects_end_reports[0];
        }

        let hot_offer_project = _.find(data.offered_projects, (project) => { return (true === project.hot); });

        if (hot_offer_project) {
            //hot_offer_project.hot = false;
        }
        else {
            hot_offer_project = null;
        }

        return (
            <div className="hidden popups-nest">
                <div>
                    {(data.stage === 'start') ?
                        <Creation data={this.props.data} />
                        : ''}
                </div>
                <div>
                    {hot_offer_project !== null ?
                        <HotOffer key={hot_offer_project.id} project={hot_offer_project} data={this.props.data} />
                        : ''}
                </div>
            </div>
        );
    }
}

export default PopupsNest;