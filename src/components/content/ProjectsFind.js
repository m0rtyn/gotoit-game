import React, { Component } from 'react';

import ProjectOfferBlock from '../ProjectOfferBlock';

import SalesAgency from '../SalesAgency';

class ProjectsFind extends Component {

    render() {
        const data = this.props.data;
        let offered = (candidate) => { return <ProjectOfferBlock key={candidate.id} candidate={candidate} data={this.props.data} /> };

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
                            Sales Department
                            <button className="btn btn-info hidden" onClick={this.props.data.helpers.contractSearch}>Search 1000$</button>
                        </h4>

                        <div className="progress slim">
                            <div className='progress-bar' role="progressbar"
                                 style={{width: Math.min(100, data.reputation)+'%'}}>
                                <label>{data.reputation}%</label>
                            </div>
                        </div>

                        <span className="flex-element">
                                <button className="btn btn-success btn-sm" onClick={() => { data.helpers.changeContent('Advertising'); }}>Advertising</button>
                        </span>
                    </div>
                </div>
            </div>
    }
}

export default ProjectsFind;
