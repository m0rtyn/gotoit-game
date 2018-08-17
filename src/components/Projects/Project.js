import React, { Component } from 'react';
import Portal from 'react-portal';

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import 'bootstrap-slider/dist/css/bootstrap-slider.min.css';

import _ from 'lodash';

import { current_tick } from '../../App';
import TeamDialog from '../TeamDialog';
import StatsBar from '../StatsBar';
import ProjectName from './ProjectName';
import ProjectProgressBar from './ProjectProgressBar';
import ProjectDeadlineBar from './ProjectDeadlineBar';

import { skills_names, technologies } from '../../game/knowledge';
import { KickWorkerButton } from './KickWorkerButton';
import { StartPauseButton } from './StartPauseButton';
import { ReleaseButton } from './ReleaseButton';
import { ProjectReward } from './ProjectReward';
import { ProjectMoney } from './ProjectMoney';
import ProjectDeadline from './ProjectDeadline';
import { LockedTechnology } from './LockedTechnology';
import { Statistics } from './Statistics';
import { RejectButton } from './RejectButton';
import { Avatar } from './Avatar';
import { SkillRow } from './SkillRow';
import { TasksProgress } from './TasksProgress';
import { Refactoring } from './Refactoring';
import { Tests } from './Tests';
import * as PropTypes from 'prop-types';

class Technology extends Component {
  render() {
    return (
      <div key={this.props.technologyId} className="row-md-1">
        <div className="form-check-checkbox slim-margin">
          <span>
            <h5 className="text-center slim">
              <input
                type="checkbox"
                id={this.props.technologyId}
                checked={this.props.technology(
                  this.props.id,
                  this.props.technologyId
                )}
                onChange={this.props.changeTechnology}
              />
              {this.props.name}
            </h5>
            <p className="small slim">{this.props.description}</p>
          </span>
        </div>
      </div>
    );
  }
}

Technology.propTypes = {
  technologyId: PropTypes.any,
  technology: PropTypes.any,
  id: PropTypes.any,
  changeTechnology: PropTypes.func,
  name: PropTypes.any,
  description: PropTypes.any
};

class Project extends Component {
  constructor(props) {
    super(props);

    this.manage = this.manage.bind(this);
    this.manageAll = this.manageAll.bind(this);
    this.changeTechnology = this.changeTechnology.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onRelease = this.onRelease.bind(this);
    this.onReject = this.onReject.bind(this);
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
    this.props.data.helpers.modifyRelation(
      event.target.id,
      this.props.project.id,
      event.target.checked
    );
  }

  manageAll(event) {
    this.props.data.helpers.modifyRelation(
      null,
      this.props.project.id,
      event.target.checked
    );
  }

  changeTechnology(event) {
    this.props.data.helpers.changeTechnology(
      event.target.id,
      this.props.project.id,
      event.target.checked
    );
  }
  onSelectChange(e) {
    this.props.data.helpers.changeTeamSelector();
    this.props.data.helpers.modifyRelation(e.value.id, this.props.project.id);
    this.props.data.helpers.modifyHoveredObjects();
  }
  onRelease() {
    this.props.data.helpers.fixProject(this.props.project.id);
  }
  onReject() {
    if (
      window.confirm(
        `Reject project ${this.props.project.name}? (penalty: ${
          this.props.project.penalty
        })`
      )
    ) {
      this.close();
    }
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

  render() {
    const data = this.props.data;
    const project = this.props.project;
    let {
      getTechnology,
      modifyHoveredObjects,
      fixProject,
      changeTeamSelector,
      modifyRelation,
      kickWorker
    } = data.helpers;
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
      is_paused
    } = project;
    /*const stats_data = _.mapValues(skills, (stat, key) => {

            return {name: key, // _.capitalize(key[0]),
                val:
                    <span>
                        <span className="text-warning">
                            {project.needs(key)}
                        </span>
                        {project.bugs[key] > 0 
                            ? <span className="text-danger"> +{project.bugs[key]}</span> 
                            : ''
                        }
                        /<span>{project.estimate[key]}</span>
                    </span>
            };
        });*/

    const manage_button = (
      <button className="btn btn-xs btn-success">Manage</button>
    );

    //let unoccupied_workers = data.workers.filter((worker) => {return data.helpers.deepCheckRelation(worker, project)});

    let label = worker => {
      return (
        <KickWorkerButton
          id={worker.id}
          action={() => kickWorker(worker, project)}
          name={worker.name}
        />
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
      if (
        worker.id in team_ids &&
        worker.get_monthly_salary &&
        data.helpers.deepCheckRelation(worker, project)
      ) {
        team.push(worker);
      }
    });

    const team_label = team.map(worker => {
      return label(worker);
    });

    let tech = [];

    if (id in data.projects_technologies) {
      Object.keys(data.projects_technologies[id]).forEach(tech_name => {
        if (data.projects_technologies[project.id][tech_name]) {
          tech.push(tech_name);
        }
      });
    }

    const tech_label = tech.map(tech_name => {
      return label(tech_name, technologies[tech_name].acronym);
    });

    //console.log(project_platforms[project.platform].icon)

    let complexityMax = project.complexity_max;
    let planedTasksQuantity = project.planedTasksQuantity;
    let tests = project.tests;
    let doneQuantity = project.doneQuantity();
    let deadlineText = project.getDeadlineText();
    return (
      <div
        className={`project card ${
          data.hovered_projects_id || [].includes(id) ? 'hovered' : ''
        }`}
        onMouseOver={() => {
          modifyHoveredObjects([project], team);
        }}
        onMouseOut={() => {
          modifyHoveredObjects();
        }}
        id={id}
      >
        <div className="card-header">
          <div className="card-header">
            <Avatar name={name} avatar={avatar} />
            <div className="project-money">
              <ProjectName project={project} />
              <ProjectMoney reward={reward} penalty={penalty} />
            </div>
          </div>
          <Portal ref="manage" closeOnEsc openByClickOn={manage_button}>
            <TeamDialog>
              <h4>
                <span>
                  {' '}
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
                  />{' '}
                </span>
                <ProjectReward reward={reward} project={project} />
                <div>
                  <span>
                    <StartPauseButton
                      paused={is_paused}
                      stage={stage}
                      onUnpause={this.unpause}
                      onOpen={this.open}
                      onPause={this.pause}
                    />
                    <RejectButton onClick={this.onReject} />
                    <ReleaseButton
                      doneQuantity={doneQuantity}
                      type={type}
                      stage={stage}
                      onClick={this.onRelease}
                    />
                  </span>
                </div>
              </h4>
              <div className="row">
                <div className="col-8">
                  <div>
                    <ProjectDeadline
                      deadline={deadline}
                      deadlineMax={deadline_max}
                    />
                    <Statistics
                      iteration={iteration}
                      project={project}
                      complexity={complexity}
                    />
                    <div>
                      {type === 'draft' &&
                        stage === 'ready' &&
                        skills_names.map(skill => {
                          return (
                            <SkillRow
                              key={skill}
                              skill={skill}
                              value={project.estimate[skill]}
                              onChange={e => {
                                project.estimate[skill] = e.target.value;
                                project.original_estimate[skill] =
                                  e.target.value;
                              }}
                            />
                          );
                        })}
                    </div>
                    <div>
                      {!(type === 'draft' && stage === 'ready') &&
                        skills_names.map(skill => {
                          //     console.log(project);
                          let tasks = project.needs(skill);
                          if (tasks === Number.POSITIVE_INFINITY) {
                            tasks = 0;
                          }
                          let bugs = project.bugs[skill];
                          let done = project.done[skill];

                          let max_skill = _.maxBy(
                            _.keys(project.estimate),
                            function(skill) {
                              return (
                                Math.max(
                                  project.needs(skill) !==
                                  Number.POSITIVE_INFINITY
                                    ? project.needs(skill)
                                    : 0,
                                  project.estimate[skill],
                                  project.done[skill]
                                ) + project.bugs[skill]
                              );
                            }
                          );

                          let max =
                            Math.max(
                              project.needs(max_skill) !==
                              Number.POSITIVE_INFINITY
                                ? project.needs(max_skill)
                                : 0,
                              project.estimate[max_skill] !==
                              Number.POSITIVE_INFINITY
                                ? project.estimate[max_skill]
                                : 0,
                              project.done[max_skill]
                            ) + project.bugs[max_skill]; //, project.needs(max_skill)) + project.bugs[max_skill];

                          if (max === 0) max = 1;

                          let tasks_percent = (tasks / max) * 100;
                          let bugs_percent = (bugs / max) * 100;
                          let done_percent = (done / max) * 100;

                          //   console.log(tasks_percent, bugs_percent, done_percent);

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

                    {getTechnology(id, 'refactoring') && (
                      <Refactoring
                        complexity={complexity}
                        complexityMax={complexityMax}
                      />
                    )}

                    {tests > 0 && (
                      <Tests
                        tests={tests}
                        planedTasksQuantity={planedTasksQuantity}
                      />
                    )}
                  </div>
                  <div className="card">
                    <div>
                      {this.props.data.workers.map(worker => {
                        const stats_data = _.mapValues(
                          worker.stats,
                          (val, skill) => {
                            return {
                              name: skill,
                              val: (
                                <div key={worker.id + project.id}>
                                  <span style={{ width: '100%' }}>
                                    <input
                                      type="checkbox"
                                      id={worker.id || ''}
                                      checked={data.helpers.getRelation(
                                        worker.id,
                                        project.id,
                                        skill
                                      )}
                                      onChange={event => {
                                        modifyRelation(
                                          event.target.id,
                                          project.id,
                                          event.target.checked,
                                          skill
                                        );
                                      }}
                                    />
                                    {worker.getStatsData(skill)}
                                  </span>
                                </div>
                              )
                            };
                          }
                        );
                        return (
                          <div key={worker.id + project.id}>
                            <div>{worker.name}</div>
                            <StatsBar
                              stats={stats_data}
                              data={this.props.data}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card">
                    <div className="col slim-left">
                      {data.projects_known_technologies.map(
                        (technologyId, i) => (
                          <Technology
                            key={technologyId}
                            technologyId={technologyId}
                            technology={getTechnology}
                            id={id}
                            changeTechnology={this.changeTechnology}
                            name={technologies[technologyId].name}
                            description={technologies[technologyId].description}
                          />
                        )
                      )}
                      {current_tick > 24 * 30 * 3
                        ? Object.keys(technologies).map((technology, i) => (
                            <LockedTechnology
                              key={technology}
                              technology={technology}
                              projectsKnownTechnologies={
                                data.projects_known_technologies
                              }
                              price={technologies[technology].price}
                              money={data.money}
                              f={() => {
                                if (
                                  technologies[technology].price <= data.money
                                )
                                  data.helpers.unlockTechnology(technology);
                              }}
                              name={technologies[technology].name}
                              description={technologies[technology].description}
                            />
                          ))
                        : ''}
                    </div>
                  </div>
                </div>
              </div>
            </TeamDialog>
          </Portal>
        </div>

        {/*{project.deadline > 0 && project.deadline !== Number.POSITIVE_INFINITY ?
                    <div className="progress">
                        <div className={classNames('progress-bar', (project.deadline / project.deadline_max < 0.1 ? 'bg-danger' : 'bg-warning'))} role="progressbar"
                             style={{width: (100-(project.deadline / project.deadline_max * 100))+'%'}}>
                            <span>{project.deadline_max - project.deadline} gone</span>
                        </div>
                        <div className="progress-bar bg-success" role="progressbar"
                             style={{width: (project.deadline / project.deadline_max * 100)+'%'}}>
                            <span>{project.deadline} to deadline</span>
                        </div>
                    </div> : ''}*/}

        <div className="card-body">
          <ProjectDeadlineBar project={project} />
          <ProjectProgressBar project={project} />

          {/* <StatsBar stats={stats_data} data={this.props.data} /> */}
          {/* <div className="project-details">
                        <div > Tasks: {project.tasksQuantity()}/{project.planedTasksQuantity()} </div>
                        <div > Bugs: <span className="text-danger">{project.bugsQuantity()}</span> </div>
                        <div > Complexity: {project.complexity} </div>
                        <div > Iteration: {project.iteration} </div>
                    </div> */}
          {/* TODO: ^ DESIGN TEMPORARY CLEANING */}

          <div className="project-team">
            <p>
              Team: {team_label}
              <button
                className={`btn btn-xs btn-info team-add-worker ${
                  data.project_team_selector === id ? 'active' : ''
                }`}
                onClick={() => changeTeamSelector(project)}
              >
                <i className="fa fa-plus" />
              </button>
            </p>
            {data.project_team_selector === id ? (
              <div>
                <Select
                  onChange={this.onSelectChange}
                  options={data.workers.map(worker => {
                    return { value: worker, label: worker.name };
                  })}
                  value={null}
                />
              </div>
            ) : null}
            {tech.length ? (
              <p className="small slim">Tech: {tech_label}</p>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
