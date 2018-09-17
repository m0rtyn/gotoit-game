import React, { Component } from "react";
import _ from "lodash";
import PublicRelations from "./PublicRelations";
import HiringAgency from "../HiringAgency";
import Bar from "../Bar/Bar";
import { colors } from "../../game/knowledge/colors";

import StatsProgressBar from "../StatsProgressBar";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";

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

            return (
                <div key={candidate.id} className="card offered-worker">
                    <div className="card-header">
                        <img className="worker-avatar" src={candidate.avatar} alt={candidate.name} />

                        <h4 className="flex-grow">
                            {candidate.name}
                            <span className="text-warning">{candidate.getSalary()}$</span>
                        </h4>

                        <div className="btn-group btn-group-xs">
                            <DefaultClickSoundButton
                                className="btn btn-success btn-outline"
                                id={candidate.id}
                                onClick={e => this.hire(e, type)}
                            >
                                Hire
                            </DefaultClickSoundButton>
                            <DefaultClickSoundButton
                                className="btn btn-danger btn-outline"
                                id={candidate.id}
                                onClick={e => this.reject(e, type)}
                            >
                                Hide
                            </DefaultClickSoundButton>
                        </div>
                    </div>
                    <div className="card-body">
                        <span className="lead">{`Character: ${candidate.character.name}. ${candidate.character.description}.`}</span>

                        <div className="worker-skills">
                            <StatsProgressBar
                                hideCheckbox={true}
                                type={"design"}
                                max_stat={data.max_candidates_stat}
                                stats={stats_progressbar_data}
                                worker={candidate}
                                data={data}
                            />
                            <StatsProgressBar
                                hideCheckbox={true}
                                type={"program"}
                                max_stat={data.max_candidates_stat}
                                stats={stats_progressbar_data}
                                worker={candidate}
                                data={data}
                            />
                            <StatsProgressBar
                                hideCheckbox={true}
                                type={"manage"}
                                max_stat={data.max_candidates_stat}
                                stats={stats_progressbar_data}
                                worker={candidate}
                                data={data}
                            />
                        </div>
                    </div>
                </div>
            );
        };

        let resumes_candidate = candidate => {
            return unit_block_template(candidate, "resumes");
        };
        let agency_candidate = candidate => {
            return unit_block_template(candidate, "agency");
        };

        const rumor_bar = [
            {
                name: "Rumor",
                width: Math.min(100, data.rumor),
                color: colors.blue,
                value: Math.ceil(data.rumor * 100) / 100,
                id: "rumor"
            }
        ];

        return (
            <div className="hire-workers">
                <h3 className="text-center">Hiring</h3>

                <h4>
                    Rumor
                    <PublicRelations data={data} />
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
        );
    }
}

export default HireWorkers;
