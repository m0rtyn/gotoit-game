import React, { Component } from 'react';
import Portal from 'react-portal';

import TeamDialog from './TeamDialog';

import Project from './Project';
import ProjectModel from '../models/ProjectModel';
import {skills_names} from '../data/knowledge';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.findProjects = this.findProjects.bind(this);
    }

    findProjects() {
        this.props.data.helpers.startProject(ProjectModel.generate());
    }

    startOffered(event, type) {
        this.props.data.helpers.startOffered(event.target.id, type);
    }

    reject(event, type) {
        this.props.data.helpers.rejectOffered(event.target.id, type);
    }

    render() {
        const find_projects = <button>Find Projects</button>;

        let project_block_template = (candidate, type) => {
            return <div key={candidate.id} className="unit_block">{candidate.name} <span></span>
                <ul>
                    {skills_names.map((skill) => {
                        return <li key={skill}> <span> {skill} {candidate.needs[skill]} </span> </li>
                    })}
                </ul>
                <button id={candidate.id} onClick={(e) => this.startOffered(e, type)}>Start</button>
                <button id={candidate.id} onClick={(e) => this.reject(e, type)}>Reject{type === 'contract' ? ' +900$' : ''}</button>
                {candidate.reward}$
            </div>
        };

        let freelance_offered = (candidate) => { return project_block_template(candidate, 'freelance'); };
        let contract_offered  = (candidate) => { return project_block_template(candidate, 'contract'); };
        let bigdeal_offered   = (candidate) => { return project_block_template(candidate, 'bigdeal'); };

        return (
            <div>
                <h4>Projects</h4>


                <Portal closeOnEsc closeOnOutsideClick openByClickOn={find_projects}>
                    <TeamDialog>
                        <h3 className="text-center">Find Projects</h3>
                        <div className="row">
                            <div className="col-md-4">
                                <h4 className="text-center">Freelance</h4>
                                {this.props.data.offered_projects.freelance.map(freelance_offered)}
                            </div>
                            <div className="col-md-4">
                                <h4 className="text-center">Contract</h4>
                                <button onClick={this.props.data.helpers.contractSearch}>Search 1000$</button>
                                {this.props.data.offered_projects.contract.map(contract_offered)}
                            </div>
                            <div className="col-md-4">
                                <h4 className="text-center">Big Deal</h4>
                                {this.props.data.offered_projects.bigdeal.map(bigdeal_offered)}
                            </div>
                        </div>
                    </TeamDialog>
                </Portal>

                <div>
                {this.props.data.projects.map((x, i) =>
                    <Project key={x.id} project={x} data={this.props.data} />
                )}
                </div>
            </div>
        );
    }
}

export default Projects;