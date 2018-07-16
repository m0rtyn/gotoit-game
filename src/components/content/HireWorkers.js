import React, {Component} from "react";
import _ from 'lodash';
import StatsBar from '../StatsBar';
import HiringAgency from '../HiringAgency';
import Bar from '../Bar';
import {colors, skills} from "../../game/knowledge";

import StatsProgressBar from '../StatsProgressBar';


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

            const stats_progressbar_data = _.mapValues(candidate.stats, (val, stat) => {

                return {
                    name: stat,
                    value: candidate.getStatsData(stat),
                    color: colors[stat].colorCompleted
                };
            });

            return <div key={candidate.id} className="card">{candidate.name} <span> {candidate.getSalary()}$</span>
                <div>{`Character: ${candidate.character.name}. ${candidate.character.description}.`}</div>
                <div className="worker-skills">
                    <StatsProgressBar type={'design'} stats={stats_progressbar_data} worker={candidate} data={data}/>
                    <StatsProgressBar type={'program'} stats={stats_progressbar_data} worker={candidate} data={data}/>
                    <StatsProgressBar type={'manage'} stats={stats_progressbar_data} worker={candidate} data={data}/>
                </div>
                <button className="btn btn-success" id={candidate.id} onClick={(e) => this.hire(e, type)}>Hire</button>
                <button className="btn btn-danger" id={candidate.id} onClick={(e) => this.reject(e, type)}>Hide</button>

            </div>
        };

        let resumes_candidate = (candidate) => { return unit_block_template(candidate, 'resumes'); };
        let agency_candidate  = (candidate) => { return unit_block_template(candidate, 'agency'); };

        const rumor_bar = [
            {
                name : 'Rumor',
                width : Math.min(100, data.rumor),
                color : colors.blue,
                value : Math.ceil((data.rumor)*100)/100,
                id: 'rumor'
            }
        ];

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
                            Rumor
                        </h4>
                        <Bar bar_data={rumor_bar} />

                        <span className="">
                            <button className="btn btn-success btn-sm" onClick={() => { data.helpers.changeContent('PublicRelations'); }}>PublicRelations</button>
                        </span>
                    </div>


                    {data.candidates.agency.map(agency_candidate)}
                </div>
            </div>


        )
    }
}

export default HireWorkers;