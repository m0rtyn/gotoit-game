import React, {Component} from "react";
import _ from 'lodash';
import StatsBar from '../StatsBar';
import HiringAgency from '../HiringAgency';
import {skills} from "../../game/knowledge";

class HireWorkers extends Component {
    constructor(props) {
        super(props);

        this.hire = this.hire.bind(this);
        this.reject = this.reject.bind(this);
    }

    hire(event, type) {
        this.props.data.helpers.hireCandidate(event.target.id, type);
    }

    reject(event, type) {
        this.props.data.helpers.rejectCandidate(event.target.id, type);
    }

    render() {
        const data = this.props.data;
        let unit_block_template = (candidate, type) => {
            const stats_data = _.mapValues(skills, (val, key) => {
                return { name: key, val: <span>{candidate.stats[key]}</span> };
            });

            return <div key={candidate.id} className="panel panel-info">{candidate.name} <span> {candidate.getSalary()}$</span>
                <div>{`Character: ${candidate.character.name}. ${candidate.character.description}.`}</div>
                <StatsBar stats={stats_data} data={data} />
                <button className="btn btn-success" id={candidate.id} onClick={(e) => this.hire(e, type)}>Hire</button>
                <button className="btn btn-danger" id={candidate.id} onClick={(e) => this.reject(e, type)}>Hide</button>

            </div>
        };

        let resumes_candidate = (candidate) => { return unit_block_template(candidate, 'resumes'); };
        let agency_candidate  = (candidate) => { return unit_block_template(candidate, 'agency'); };


        return (
            <div>
                <h3 className="text-center">Hiring</h3>
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="text-center fat">
                            Resume
                            <HiringAgency data={data} />
                        </h4>
                        {data.candidates.resumes.map(resumes_candidate)}
                    </div>
                    <div className="col-md-6">
                        <h4 className="text-center fat slim-top">
                            Hr Department
                            <button  className="btn btn-info hidden" onClick={data.helpers.agencySearch}>Search 1000$</button>
                        </h4>

                        <div className="panel panel-success text-center">
                            <div className="progress slim">
                                <div className='progress-bar' role="progressbar"
                                     style={{width: Math.min(100, data.rumor)+'%'}}>
                                    <label>{data.rumor}%</label>
                                </div>
                            </div>
                            <span className="flex-element">
                                <button className="btn btn-success btn-sm" onClick={() => { data.helpers.changeContent('Advertising'); }}>Advertising</button>
                             </span>
                        </div>


                        {data.candidates.agency.map(agency_candidate)}
                    </div>
                </div>
            </div>

        )
    }
}

export default HireWorkers;