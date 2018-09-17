import React, { Component } from "react";
import _ from "lodash";

import ProjectName from "./ProjectName";
import StatsProgressBar from "../StatsProgressBar";

import { colors } from "../../game/knowledge/colors";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";

// import Project from './Project';

class ProjectOfferBlock extends Component {
    acceptOffered(event) {
        this.props.data.helpers.acceptOffered(event.target.id);
    }

    startOffered(event) {
        this.props.data.helpers.startOffered(event.target.id);
    }

    reject(event) {
        this.props.data.helpers.rejectOffered(event.target.id);
    }

    render() {
        let candidate = this.props.candidate;
        let type = this.props.type;
        let data = this.props.data;

        const stats_progressbar_data = _.mapValues(candidate.estimate, (val, stat) => {
            return {
                name: stat,
                value: candidate.originalyTasksQuantity(),
                color: colors[stat].colorCompleted
            };
        });
        console.log(data.max_stats_projects_offered);
        return (
            <div key={candidate.id} className="card offered-project">
                <div className="card-header">
                    <div className="project-avatar">
                        <img src={candidate.avatar.platform} />
                        <img src={candidate.avatar.kind} />
                    </div>

                    <ProjectName project={candidate} />

                    <div className="btn-group btn-group-xs">
                        <DefaultClickSoundButton
                            className="btn btn-success btn-outline"
                            id={candidate.id}
                            onClick={e => this.startOffered(e, type)}
                        >
                            Start
                        </DefaultClickSoundButton>
                        <DefaultClickSoundButton
                            className="btn btn-warning btn-outline"
                            id={candidate.id}
                            onClick={e => this.acceptOffered(e, type)}
                        >
                            Accept
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
                    <StatsProgressBar
                        type={"design"}
                        hideCheckbox={true}
                        max_stat={data.max_stats_projects_offered}
                        stats={stats_progressbar_data}
                        worker={candidate}
                        data={data}
                    />
                    <StatsProgressBar
                        type={"program"}
                        hideCheckbox={true}
                        max_stat={data.max_stats_projects_offered}
                        stats={stats_progressbar_data}
                        worker={candidate}
                        data={data}
                    />
                    <StatsProgressBar
                        type={"manage"}
                        hideCheckbox={true}
                        max_stat={data.max_stats_projects_offered}
                        stats={stats_progressbar_data}
                        worker={candidate}
                        data={data}
                    />
                </div>
            </div>
        );
    }
}

export default ProjectOfferBlock;
