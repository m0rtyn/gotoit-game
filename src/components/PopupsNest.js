import React, { Component } from 'react';

import _ from 'lodash';

import Creation from './Creation';

class PopupsNest extends Component {
    render() {
        const data = this.props.data;

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
            </div>
        );
    }
}

export default PopupsNest;