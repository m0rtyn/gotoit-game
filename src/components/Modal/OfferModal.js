import React, { Component } from "react";
import { skills } from "../../game/knowledge/skills";
import { project_offer_will_expire_after } from "../../game/knowledge/projects";
import { FormattedDate } from "react-intl";
import _ from "lodash";
import StatsBar from "../StatsBar";

import ProjectName from "../Projects/ProjectName";
import { Avatar } from "../Projects/Avatar";

class Offer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //   end_screen_project: null
        };
    }
    acceptOffered(event) {
        this.props.data.helpers.acceptOffered(event.target.id);
        this.props.closeModal();
    }

    startOffered(event) {
        this.props.data.helpers.startOffered(event.target.id);
        this.props.closeModal();
    }

    reject(event) {
        this.props.data.helpers.rejectOffered(event.target.id);
        this.props.expired = true;
        this.props.closeModal();
    }

    render() {
        const data = this.props.data;
        let letter = this.props.letter;
        let project = this.props.project;
        let createdAt = this.props.createdAt;
        let expired = this.props.expired;
        let hours_to_expire = Math.round(createdAt + project_offer_will_expire_after - data.date.tick);

        const stats_data = _.mapValues(skills, (stat, key) => {
            return { name: key, val: <span>{project.needs(key)}</span> };
        });

        console.log(letter);

        return (
            <section className="offer-modal">
                <div className="modal-header flexbox">
                    <div>
                        <p className="fw-700">enterpreneur resume</p>
                    </div>
                    <div>
                        <FormattedDate value={letter.date} weekday="short" day="numeric" month="short" year="numeric" hour="numeric" />
                        <span className="icon-star-border" />
                        <Avatar className="project-avatar" name={project.name} sources={_.toPairs(project.avatar)} />
                    </div>
                </div>
                <div className="modal-body">
                    <ProjectName project={project} />
                    <span>Deadline: {project.getDeadlineText()}</span>
                    <span>
                        <h4 className="project-reward text-success"> Reward: ${project.reward}</h4>
                    </span>
                    {project.penalty > 0 ? (
                        <span>
                            {" "}
                            <h4 className="project-penalty text-warning">Penalty : ${project.penalty}</h4>
                        </span>
                    ) : (
                        " "
                    )}
                    <div key={project.id}>
                        <StatsBar stats={stats_data} data={this.props.data} />

                        {project.stage === "ready" ? (
                            !expired ? (
                                <div>
                                    <h3>{`Will expire in ${hours_to_expire} hours`}</h3>
                                    <div className="btn-group">
                                        <button className="btn btn-success" id={project.id} onClick={e => this.startOffered(e)}>
                                            Start
                                        </button>
                                        {/*&nbsp;
                                        <button className="btn btn-warning" id={project.id} onClick={e => this.acceptOffered(e)}>
                                            Accept
                                        </button>*/}
                                        &nbsp;
                                        <button className="btn btn-danger" id={project.id} onClick={e => this.reject(e)}>
                                            Hide
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                "This offer has expired"
                            )
                        ) : (
                            "You already took this offer"
                        )}
                    </div>
                </div>
            </section>
        );
    }
}

export default Offer;
