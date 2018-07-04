import React, { Component } from 'react';

import ProjectOfferBlock from '../ProjectOfferBlock';

import SalesAgency from '../SalesAgency';
import Bar from '../Bar';
import {colors} from "../../game/knowledge";

class ProjectsFind extends Component {

    render() {
        const data = this.props.data;
        let offered = (candidate) => { return <ProjectOfferBlock key={candidate.id} candidate={candidate} data={this.props.data} /> };
        const reputation_bar = [
            {
                name : 'Reputation',
                width : Math.min(100, data.reputation),
                color : colors.orange,
                value : Math.ceil((data.reputation)*100)/100,
                id: 'reputation'
            }
        ];


        return <div>
                <h3 className="text-center">
                    Find Projects
                </h3>
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="text-center fat">Offered Projects
                            <SalesAgency data={this.props.data} /></h4>
                        {this.props.data.offered_projects.map(offered)}
                    </div>
                    <div className="col-md-6">
                        <h4 className="text-center slim-top">
                            Reputation
                        </h4>
                        <Bar bar_data={reputation_bar} />

                        <span className="flex-element">
                                <button className="btn btn-success btn-sm" onClick={() => { data.helpers.changeContent('Advertising'); }}>Advertising</button>
                        </span>
                    </div>
                </div>
            </div>
    }
}

export default ProjectsFind;
