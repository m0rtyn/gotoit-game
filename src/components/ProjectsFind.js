import React, { Component } from 'react';
import Portal from 'react-portal';

import TeamDialog from './TeamDialog';
import ProjectOfferBlock from './ProjectOfferBlock';

import SalesAgency from './SalesAgency';
import SalesDepartment from './SalesDepartment';

class ProjectsFind extends Component {

    render() {
        const find_projects = <button className="btn btn-success btn-sm">Find Projects</button>;

        let offered = (candidate) => { return <ProjectOfferBlock key={candidate.id} candidate={candidate} data={this.props.data} /> };

        return (
            <Portal closeOnEsc openByClickOn={find_projects}>
                <TeamDialog>
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
                </TeamDialog>
            </Portal>
        );
    }
}

export default ProjectsFind;
