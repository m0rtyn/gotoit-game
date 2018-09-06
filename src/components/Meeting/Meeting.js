import PropTypes from "prop-types";
import React, { Component } from "react";
import Portal from "react-portal";
import _ from "lodash";

import TeamDialog from "../TeamDialog";
import StartPauseButton from "./StartPauseButton";
import ProjectDeadline from "./ProjectDeadline";
import WorkerCard from "./WorkerCard";
import ProgressDeadline from "./ProgressDeadline";
import { RejectButton } from "./RejectButton";

class Meeting extends Component {
    static propTypes = {
        data: PropTypes.object,
        project: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.manage = this.manage.bind(this);
        this.manageAll = this.manageAll.bind(this);
        this.changeTechnology = this.changeTechnology.bind(this);
        this.finish = this.finish.bind(this);
        this.fix = this.fix.bind(this);
        this.open = this.open.bind(this);
        this.pause = this.pause.bind(this);
        this.unpause = this.unpause.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
        if (!this.props.project.briefing) {
            this.props.project.briefing = true;
            this.refs.manage.openPortal();
        }
    }

    manage(event) {
        this.props.data.helpers.modifyRelation(event.target.id, this.props.project.id, event.target.checked);
    }

    manageAll(event) {
        this.props.data.helpers.modifyRelation(null, this.props.project.id, event.target.checked);
    }

    changeTechnology(event) {
        this.props.data.helpers.changeTechnology(event.target.id, this.props.project.id, event.target.checked);
    }

    open() {
        this.props.data.helpers.openProject(this.props.project.id);
    }
    pause() {
        this.props.data.helpers.pauseProject(this.props.project.id);
    }
    unpause() {
        this.props.data.helpers.unpauseProject(this.props.project.id);
    }

    close() {
        this.props.data.helpers.closeProject(this.props.project.id);
    }

    fix() {
        this.props.data.helpers.fixProject(this.props.project.id);
    }

    finish() {
        this.props.data.helpers.finishProject(this.props.project.id);
    }

    onClickRejectProject() {
        const { project } = this.props;
        if (window.confirm("Reject project " + project.name + "? (penalty: " + project.penalty + ")")) {
            this.close();
        }
    }

    render() {
        const data = this.props.data;
        const project = this.props.project;

        const manage_button = <button className="btn btn-manage">Manage</button>;

        let label = (id, text) => {
            return (
                <span key={id} className="text-primary">
                    {" "}
                    {text}{" "}
                </span>
            );
        };

        let team_ids = {};
        _.keys(data.relations).forEach(worker_id => {
            let worker_projects = data.relations[worker_id];
            _.keys(worker_projects).forEach(project_id => {
                let relation = worker_projects[project_id];
                if (relation && project_id === project.id) {
                    team_ids[worker_id] = true;
                }
            });
        });
        let team = [];
        data.workers.forEach(worker => {
            if (worker.id in team_ids) {
                team.push(worker);
            }
        });
        const team_label = team.map(worker => {
            return label(worker.id, worker.name);
        });

        return (
            <div className="card fat">
                <div className="">
                    <span className=""> {project.name} </span>
                    <span className=""> Reward: {project.reward}$ </span>
                    {project.penalty > 0 ? <span className=""> Penalty: {project.penalty}$ </span> : " "}
                    <div>
                        <StartPauseButton
                            paused={project.is_paused}
                            unpause={this.unpause}
                            stage={project.stage}
                            open={this.open}
                            pause={this.pause}
                        />
                        <RejectButton onClickRejectProject={this.onClickRejectProject} />
                        <Portal ref="manage" closeOnEsc openByClickOn={manage_button}>
                            <TeamDialog>
                                <h4 className="">
                                    <span className=""> {project.name} </span>
                                    <div className="">
                                        {" "}
                                        <StartPauseButton
                                            paused={project.is_paused}
                                            unpause={this.unpause}
                                            stage={project.stage}
                                            open={this.open}
                                            pause={this.pause}
                                        />
                                        <RejectButton onClickRejectProject={this.onClickRejectProject} />{" "}
                                    </div>
                                </h4>
                                <div className="row">
                                    <div className="col-md-8">
                                        <div>
                                            {project.deadline > 0 ? (
                                                <ProjectDeadline deadline={project.deadline} deadlineMax={project.deadline_max} />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="card">
                                            {this.props.data.workers.map(worker => {
                                                return (
                                                    <WorkerCard
                                                        key={worker.id + project.id}
                                                        worker-id={worker.id}
                                                        project-id={project.id}
                                                        relation={data.helpers.getRelation}
                                                        f={event => {
                                                            data.helpers.modifyRelation(
                                                                event.target.id,
                                                                project.id,
                                                                event.target.checked,
                                                                "meeting"
                                                            );
                                                        }}
                                                        name={worker.name}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </TeamDialog>
                        </Portal>
                    </div>
                </div>

                {project.deadline > 0 ? <ProgressDeadline deadline={project.deadline} deadlineMax={project.deadline_max} /> : ""}

                <div className="small slim">
                    <p className="small slim">Team: {team_label}</p>
                </div>
            </div>
        );
    }
}

export default Meeting;
