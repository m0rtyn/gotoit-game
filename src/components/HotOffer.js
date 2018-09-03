import React, { PureComponent } from "react";
import _ from "lodash";
import { skills } from "../game/knowledge/skills";
import StatsBar from "./StatsBar";
import ProjectName from "./Projects/ProjectName";
import { Avatar } from "./Projects/Avatar";

class HotOffer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            //   end_screen_project: null
        };
    }
    acceptOffered(event) {
        this.props.data.helpers.acceptOffered(event.target.id);
        this.props.closePopup();
    }

    startOffered(event) {
        this.props.data.helpers.startOffered(event.target.id);
        this.props.closePopup();
    }

    reject(event) {
        this.props.data.helpers.rejectOffered(event.target.id);
        this.props.closePopup();
    }

    render() {
        let project = this.props.letter.object;
        let { reward, name, platform, kind, size, penalty, id, stage } = project;
        let expired = this.props.letter.expired;
        const stats_data = _.mapValues(skills, (stat, key) => {
            return { name: key, val: <span>{project.needs(key)}</span> };
        });

        return (
            <div>
                <div>
                    <button
                        className="btn btn-warning float-right"
                        onClick={() => {
                            //data.helpers.projectArchiving();
                            this.props.closePopup();
                        }}
                    >
                        Close
                    </button>
                </div>
                <div>
                    <div className="flexbox">
                        <span style={{ position: "relative", width: "200px", height: "200px" }}>
                            <Avatar name={name} style={{ position: "absolute" }} size={200} sources={_.toPairs(project.avatar)} />
                        </span>
                        <span className="moat flex-grow">
                            <h3>{project.lore.name}</h3>
                            <p>{project.lore.text}</p>
                        </span>
                    </div>

                    <div className="moat slim_top">
                        <div key={id} className="card">
                            <ProjectName
                                name={name}
                                penalty={penalty}
                                deadlineText={project.getDeadlineText()}
                                platform={platform}
                                reward={reward}
                            />
                            <div>
                                <span>
                                    <h4 className="project-reward text-success"> Reward: ${reward}</h4>
                                </span>
                                {penalty > 0 ? (
                                    <span>
                                        {" "}
                                        <h4 className="project-penalty text-warning">Penalty : ${penalty}</h4>{" "}
                                    </span>
                                ) : (
                                    " "
                                )}
                            </div>
                            <StatsBar stats={stats_data} data={this.props.data} />
                            {stage === "ready" ? (
                                !expired ? (
                                    <div className="btn-group">
                                        <button className="btn btn-success" id={id} onClick={e => this.acceptOffered(e)}>
                                            Accept
                                        </button>
                                        &nbsp;
                                        <button className="btn btn-warning" id={id} onClick={e => this.startOffered(e)}>
                                            Start
                                        </button>
                                        &nbsp;
                                        <button className="btn btn-danger" id={id} onClick={e => this.reject(e)}>
                                            Hide
                                        </button>
                                    </div>
                                ) : (
                                    "This offer has expired"
                                )
                            ) : (
                                "You already took this offer"
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HotOffer;
