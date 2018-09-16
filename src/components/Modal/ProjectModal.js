import React, { Component } from "react";
import ProjectName from "../Projects/ProjectName";
import { skills_names } from "../../game/knowledge/skills";
import { StartPauseButton } from "../Projects/StartPauseButton";
import { ReleaseButton } from "../Projects/ReleaseButton";
import { ProjectReward } from "../Projects/ProjectReward";
import { TasksProgress } from "../Projects/TasksProgress";
import { RejectButton } from "../Projects/RejectButton";

import ProjectDeadline from "../Projects/ProjectDeadline";
import { Statistics } from "../Projects/Statistics";

import { Refactoring } from "../Projects/Refactoring";
import { SkillRow } from "../Projects/SkillRow";
import { Tests } from "../Projects/Tests";
import StatsBar from "../StatsBar";
import { Technology } from "../Projects/Technology";
import _ from "lodash";
import { StatsDataItem } from "../Projects/StatsDataItem";
import { technologies } from "../../game/knowledge/technologies";

export default class ProjectModal extends Component {
    /*static propTypes = {
        project: PropTypes.object.required,
        data: PropTypes.object.required
    };*/
    open = () => {
        this.props.data.helpers.openProject(this.props.project.id);
    };
    getStatsData = worker => {
        let { project, data } = this.props;
        let { getRelation, modifyRelation } = data.helpers;
        // let { getStatsData } = worker;
        return _.mapValues(worker.stats, (val, skill) => {
            return {
                name: skill,
                val: (
                    <StatsDataItem
                        workerId={worker.id}
                        projectId={project.id}
                        relation={getRelation}
                        skill={skill}
                        onChange={event => {
                            modifyRelation(event.target.id, project.id, event.target.checked, skill);
                        }}
                        statsData={worker.getStatsData(skill)}
                    />
                )
            };
        });
    };

    changeTechnology = event => {
        this.props.data.helpers.changeTechnology(event.target.id, this.props.project.id, event.target.checked);
    };

    addTechnology = event => {
        if (technologies[event.target.id].price <= this.props.data.money) this.props.data.helpers.unlockTechnology(event.target.id);
    };

    onRelease = () => {
        this.props.data.helpers.fixProject(this.props.project.id);
    };

    onReject = () => {
        if (window.confirm(`Reject project ${this.props.project.name}? (penalty: ${this.props.project.penalty})`)) {
            this.props.closeModal();
            this.props.data.helpers.rejectProject(this.props.project.id);
        }
    };

    manage = event => {
        this.props.data.helpers.modifyRelation(event.target.id, this.props.project.id, event.target.checked);
    };

    extractTaskProgress = skill => {
        let { project } = this.props;
        let tasks = project.needs(skill);
        if (tasks === Number.POSITIVE_INFINITY) {
            tasks = 0;
        }
        let bugs = project.bugs[skill];
        let done = project.done[skill];

        let max_skill = _.maxBy(_.keys(project.estimate), function(skill) {
            return (
                Math.max(
                    project.needs(skill) !== Number.POSITIVE_INFINITY ? project.needs(skill) : 0,
                    project.estimate[skill],
                    project.done[skill]
                ) + project.bugs[skill]
            );
        });

        let max =
            Math.max(
                project.needs(max_skill) !== Number.POSITIVE_INFINITY ? project.needs(max_skill) : 0,
                project.estimate[max_skill] !== Number.POSITIVE_INFINITY ? project.estimate[max_skill] : 0,
                project.done[max_skill]
            ) + project.bugs[max_skill]; //, project.needs(max_skill)) + project.bugs[max_skill];

        if (max === 0) max = 1;

        let tasks_percent = (tasks / max) * 100;
        let bugs_percent = (bugs / max) * 100;
        let done_percent = (done / max) * 100;
        return { tasks, bugs, done, tasks_percent, bugs_percent, done_percent };
    };
    render() {
        let project = this.props.project;
        let { getTechnology } = this.props.data.helpers;
        let {
            id,
            type,
            stage,
            deadline,
            deadline_max,
            iteration,
            complexity,
            reward,
            penalty,
            avatar,
            name,
            platform,
            kind,
            size,
            is_paused,
            complexity_max,
            tests
        } = this.props.project;
        let deadlineText = project.getDeadlineText();
        let doneQuantity = project.doneQuantity();
        let planedTasksQuantity = project.planedTasksQuantity;
        let projectTechnologies = this.props.projectTechnologies;
        return (
            <section>
                <h4>
                    <span>
                        {" "}
                        <ProjectName
                            {...{
                                size,
                                platform,
                                kind,
                                name,
                                reward,
                                penalty
                            }}
                            deadlineText={deadlineText}
                        />{" "}
                    </span>
                    <ProjectReward reward={reward} penalty={penalty} />
                    <div>
                        <span>
                            <RejectButton onClick={this.onReject} />
                            <ReleaseButton doneQuantity={doneQuantity} type={type} stage={stage} onClick={this.onRelease} />
                        </span>
                    </div>
                </h4>
                <div className="row">
                    <div className="col-8">
                        <div>
                            <ProjectDeadline deadline={deadline} deadlineMax={deadline_max} />
                            <Statistics iteration={iteration} project={project} complexity={complexity} />
                            <div>
                                {type === "draft" &&
                                    stage === "ready" &&
                                    skills_names.map(skill => {
                                        return (
                                            <SkillRow
                                                key={skill}
                                                skill={skill}
                                                value={project.estimate[skill]}
                                                onChange={e => {
                                                    project.estimate[skill] = e.target.value;
                                                    project.original_estimate[skill] = e.target.value;
                                                }}
                                            />
                                        );
                                    })}
                            </div>
                            <div>
                                {!(type === "draft" && stage === "ready") &&
                                    skills_names.map(skill => {
                                        let { tasks, bugs, done, tasks_percent, bugs_percent, done_percent } = this.extractTaskProgress(
                                            skill
                                        );

                                        return (
                                            <TasksProgress
                                                key={skill}
                                                skill={skill}
                                                tasksPercent={tasks_percent}
                                                tasks={tasks}
                                                bugsPercent={bugs_percent}
                                                bugs={bugs}
                                                donePercent={done_percent}
                                                done={done}
                                            />
                                        );
                                    })}
                            </div>

                            {getTechnology(id, "refactoring") && <Refactoring complexity={complexity} complexityMax={complexity_max} />}

                            {tests > 0 && <Tests tests={tests} planedTasksQuantity={planedTasksQuantity} />}
                        </div>
                        <div className="card">
                            <div>
                                {this.props.data.workers.map(worker => {
                                    const stats_data = this.getStatsData(worker);
                                    return (
                                        <div key={worker.id + project.id}>
                                            <div>{worker.name}</div>
                                            <StatsBar stats={stats_data} data={this.props.data} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <div className="col slim-left">
                                {projectTechnologies.map((technology, i) => (
                                    <Technology
                                        key={technology.id}
                                        {...technology}
                                        onChange={technology.locked ? this.addTechnology : this.changeTechnology}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
