import React, { Component } from 'react';

import ProjectOfferBlock from '../ProjectOfferBlock';

import SalesAgency from '../SalesAgency';
import SalesDepartment from '../SalesDepartment';

class ProjectsFind extends Component {

    render() {

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
                        <SalesDepartment data={this.props.data} />
                    </div>
                </div>
            </div>
    }
}

export default ProjectsFind;
