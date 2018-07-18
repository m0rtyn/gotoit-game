import React, {Component} from "react";
import _ from 'lodash';
import StatsBar from '../StatsBar';
import HiringAgency from '../HiringAgency';
import Bar from '../Bar';
import {colors, skills} from "../../game/knowledge";

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

            return <div key={candidate.id} className="card offered-worker">

                <div className="card-header">
                    <img
                    className="worker-avatar"
                    src={candidate.avatar}
                    />

                    <h4 className="flex-grow">
                        {candidate.name}
                        <span className="text-warning">
                            {candidate.getSalary()}$
                        </span>
                    </h4>

                    <div className="btn-group btn-group-xs">
                        <button
                        className="btn btn-success btn-outline"
                        id={candidate.id}
                        onClick={(e) => this.hire(e, type)}
                        >
                            Hire
                        </button>
                        <button
                        className="btn btn-danger btn-outline"
                        id={candidate.id}
                        onClick={(e) => this.reject(e, type)}
                        >
                            Hide
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <span className="lead">
                        {`Character: ${candidate.character.name}. ${candidate.character.description}.`}
                    </span>

                    <StatsBar
                    stats={stats_data}
                    data={data}
                    />
                </div>
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
            <div className="hire-workers">
                <h3 className="text-center">Hiring</h3>


                <h4>
                    Rumor
                    <button
                    className="btn btn-info btn-xs"
                    onClick={ () => { 
                        data.helpers.changeContent('PublicRelations');
                    }}>
                        Public Relations
                    </button>
                </h4>

                <div className="rumor card flexbox">
                    <div className="card-body">

                        <Bar className="rumor-bar progress-lg" bar_data={rumor_bar} />

                    </div>
                </div>

                <h4>
                    Resume
                    <HiringAgency data={data} />
                </h4>

                {data.candidates.resumes.map(resumes_candidate)}
                {data.candidates.agency.map(agency_candidate)}
            </div>


        )
    }
}

export default HireWorkers;