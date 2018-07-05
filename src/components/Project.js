
import React, { Component } from 'react';
import Portal from 'react-portal';

import Select from 'react-select';
import ReactBootstrapSlider from 'react-bootstrap-slider';
// import '../../node_modules/bootstrap-slider/dist/css/bootstrap-slider.min.css';

import _ from 'lodash';
import classNames from 'classnames';

import {current_tick} from '../App';
import TeamDialog from './TeamDialog';
import StatsBar from './StatsBar';
import ProjectName from './ProjectName';
import ProjectProgressBar from './ProjectProgressBar';
import ProjectDeadlineBar from './ProjectDeadlineBar';

import {skills_names, skills, technologies, project_kinds, project_platforms} from '../game/knowledge';




class Project extends Component {
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

    render() {
        const data = this.props.data;
        const project = this.props.project;
        console.log(project.estimate)
        console.log(project.original_estimate)
        console.log(project.done)
        console.log(project.bugs)
        const stats_data = _.mapValues(skills, (stat, key) => {
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
        });

        const manage_button = <button className="btn btn-xs btn-success">Manage</button>;

        let onSelectChange = (e) => {
            data.helpers.changeTeamSelector();
            data.helpers.modifyRelation(e.value.id, project.id);
            data.helpers.modifyHoveredProjects();
        };

        //let unoccupied_workers = data.workers.filter((worker) => {return data.helpers.deepCheckRelation(worker, project)});

        let label = (worker) => {
            return <span key={worker.id}>
                <button 
                className="btn btn-xs team-remove-worker" 
                onClick={() => data.helpers.kickWorker(worker, project)}
                >
                    {worker.name}
                </button>
            </span>;
        };

        let team_ids = {};
        _.keys(data.relations).forEach((worker_id) => {
            let worker_projects = data.relations[worker_id];
            _.keys(worker_projects).forEach((project_id) => {
                let relation = worker_projects[project_id];
                if (relation && project_id === project.id) {
                    team_ids[worker_id] = true;
                }
            })
        });

        let team = [];
        data.workers.forEach((worker) => {
            if (worker.id in team_ids && worker.get_monthly_salary && data.helpers.deepCheckRelation(worker, project)) {
                team.push(worker);
            }
        });

        const team_label = team.map((worker) => { return label(worker); });

        let tech = [];
        if (project.id in data.projects_technologies) {
            Object.keys(data.projects_technologies[project.id]).forEach((tech_name) => {
                if (data.projects_technologies[project.id][tech_name]) {
                    tech.push(tech_name);
                }
            });
        }

        const tech_label = tech.map((tech_name) => { return label(tech_name, technologies[tech_name].acronym); });

        const start_pause_button =
            <span>
                {/*{project.stage}*/}
                {(project.is_paused)
                    ? <button className="btn btn-sm btn-success" onClick={this.unpause}>Start</button> : ''}
                {(project.stage === 'ready')
                    ? <button className="btn btn-sm btn-success" onClick={this.open}>Start</button> : ''}
                {(project.stage === 'open' && !project.is_paused)
                    ? <button className="btn btn-sm btn-warning" onClick={this.pause}>Pause</button> : ''}
            </span>;

        const reject_button = <button className="btn btn-sm btn-danger" onClick={() => {
            if (confirm("Reject project "+project.name+'? (penalty: '+project.penalty+')')) {
                this.close();
            } }}>Reject</button>;

        const release_button = project.doneQuantity() > 0 && project.type === 'own' && project.stage !== 'fixing' ? <button className="btn btn-success" onClick={() => {this.props.data.helpers.fixProject(project.id)}}>Release!</button> : '';

        //console.log(project_platforms[project.platform].icon)

        return (
            <div 
            className={`project card ${data.hovered_projects_id.includes(project.id) ? 'hovered' : ''}`}
            onMouseOver={() => {data.helpers.modifyHoveredObjects([project], team)}}
            onMouseOut={() => {data.helpers.modifyHoveredObjects()}}
            id={project.id}
            >
                <div className="card-header">
                    <div className="card-header">
                        <div className='project-avatar'>
                            <img 
                            className='project-avatar'
                            alt={project.name + ' avatar'} 
                            src={require(`../../public/${project_platforms[project.platform].name}.svg`)}
                            />
                            <img 
                            className='project-avatar'
                            alt={project.name + ' avatar'} 
                            src={require(`../../public/${project_kinds[project.kind].name}.svg`)}
                            />
                        </div>

                        <div className="project-money">
                            <ProjectName project={project}/>

                            <div>
                                <span className="project-reward text-success">
                                    Reward: {project.reward}$
                                </span>
                                {(project.penalty > 0 
                                    ? <span className="project-penalty text-warning"> Penalty : {project.penalty}$ </span> 
                                    : ' '
                                )}
                            </div>
                        </div>
                    </div>


                    <Portal ref="manage" closeOnEsc openByClickOn={manage_button}>
                        <TeamDialog>
                            <h4>
                                <span> <ProjectName project={project} /> </span>
                                <span>
                                    Reward: {project.reward}$
                                    {(project.penalty > 0 
                                        ? <span> Penalty: {project.penalty}$ </span> 
                                        : ' '
                                    )}
                                </span>
                                <div>
                                    <span>
                                        {start_pause_button}
                                        {reject_button}
                                        {release_button}
                                    </span>
                                </div>
                            </h4>
                            <div className="row">
                                <div className="col-8">
                                    <div>
                                        {project.deadline > 0 && project.deadline !== Number.POSITIVE_INFINITY ? <div key="deadline" className="row">
                                            <div className="col-2">Deadline</div>
                                            <div className="col-10 progress">
                                                <div className={classNames('progress-bar', (project.deadline / project.deadline_max < 0.1 ? 'bg-danger' : 'bg-warning'))} role="progressbar"
                                                        style={{width: (100-(project.deadline / project.deadline_max * 100))+'%'}}>
                                                    <span>{project.deadline_max - project.deadline} hours</span>
                                                </div>
                                                <div className="progress-bar bg-success" role="progressbar"
                                                        style={{width: (project.deadline / project.deadline_max * 100)+'%'}}>
                                                    <span>{project.deadline} hours</span>
                                                </div>
                                            </div>
                                        </div> : ''}
                                        <div >
                                            <div > Iteration: {project.iteration} </div>
                                            <div > Tasks: {project.tasksQuantity()}/{project.planedTasksQuantity()} </div>
                                            <div > Bugs: <span className="text-danger">{project.bugsQuantity()}</span></div>
                                            <div > Complexity: {project.complexity} </div>
                                        </div>

                                        <div>
                                            {project.type === 'draft' && project.stage === 'ready'
                                                ? skills_names.map((skill) => {
                                                    return <div key={skill} className="row">
                                                        <div className="col-2">{skill}</div>
                                                        <div className="col-10 ">
                                                            <ReactBootstrapSlider
                                                                scale='logarithmic'
                                                                value={project.estimate[skill]}
                                                                change={(e) => { project.estimate[skill] = e.target.value; project.original_estimate[skill] = e.target.value; }}
                                                                step={1}
                                                                max={100000}
                                                                min={0}/>
                                                        </div>
                                                    </div>;
                                                }) : ''}
                                        </div>
                                        <div>
                                            {project.type === 'draft' && project.stage === 'ready'
                                                ? ''
                                                : skills_names.map((skill) => {
                                                    //     console.log(project);
                                                    let tasks = project.needs(skill);
                                                    if (tasks === Number.POSITIVE_INFINITY) { tasks = 0; }
                                                    let bugs = project.bugs[skill];
                                                    let done = project.done[skill];

                                                    let max_skill = _.maxBy(_.keys(project.estimate), function (skill) {
                                                        return Math.max((project.needs(skill) !== Number.POSITIVE_INFINITY) ? project.needs(skill) : 0, project.estimate[skill], project.done[skill]) + project.bugs[skill];
                                                    });

                                                    let max = Math.max(
                                                        (project.needs(max_skill) !== Number.POSITIVE_INFINITY) ? project.needs(max_skill) : 0,
                                                        (project.estimate[max_skill] !== Number.POSITIVE_INFINITY) ? project.estimate[max_skill] : 0,
                                                        project.done[max_skill]) + project.bugs[max_skill];//, project.needs(max_skill)) + project.bugs[max_skill];

                                                    if (max === 0) max = 1;

                                                    let tasks_percent = tasks / max * 100;
                                                    let bugs_percent = bugs / max * 100;
                                                    let done_percent = done / max * 100;

                                                    //   console.log(tasks_percent, bugs_percent, done_percent);

                                                    return <div key={skill} className="row">
                                                        <div className="col-2">{skill}</div>
                                                        <div className="col-10 progress">
                                                            <div className="progress-bar bg-warning"
                                                                    role="progressbar"
                                                                    style={{width: tasks_percent + '%'}}>
                                                                {tasks ? <span>{tasks} tasks</span> : ''}
                                                            </div>
                                                            <div className="progress-bar bg-danger"
                                                                    role="progressbar"
                                                                    style={{width: bugs_percent + '%'}}>
                                                                {bugs ? <span>{bugs} bugs</span> : ''}
                                                            </div>
                                                            <div className="progress-bar bg-success"
                                                                    role="progressbar"
                                                                    style={{width: done_percent + '%'}}>
                                                                {(done) ? <span>{done} done</span> : ''}
                                                            </div>
                                                        </div>
                                                    </div>;
                                                })
                                            }
                                        </div>

                                        {data.helpers.getTechnology(project.id, 'refactoring') ? <div key="refactoring" className="row">
                                            <div className="col-2">Refactoring</div>
                                            <div className="col-10 progress">
                                                <div className="progress-bar bg-warning" role="progressbar"
                                                        style={{width: (project.complexity / project.complexity_max * 100)+'%'}}>
                                                    <span>{project.complexity} complexity</span>
                                                </div>
                                                <div className="progress-bar bg-success" role="progressbar"
                                                        style={{width: (100-(project.complexity / project.complexity_max * 100))+'%'}}>
                                                    {(project.complexity_max - project.complexity > 0) ?
                                                        <span>{project.complexity_max - project.complexity} refactored</span> : ''}
                                                </div>
                                            </div>
                                        </div> : ''}

                                        {project.tests > 0 ? <div key="tests" className="row">
                                            <div className="col-2">Tests</div>
                                            <div className="col-10 progress">
                                                <div className="progress-bar bg-warning" role="progressbar"
                                                        style={{width: (100-(project.tests / project.planedTasksQuantity() * 100))+'%'}}>
                                                    <span>{project.planedTasksQuantity()-project.tests} tasks</span>
                                                </div>
                                                <div className="progress-bar bg-success" role="progressbar"
                                                        style={{width: (project.tests / project.planedTasksQuantity() * 100)+'%'}}>
                                                    {(project.tests) ?<span>{project.tests} done</span> : ''}
                                                </div>
                                            </div>
                                        </div> : ''}

                                    </div>
                                    <div className="card">
                                        <div>
                                            {this.props.data.workers.map((worker) => {
                                                const stats_data = _.mapValues(worker.stats, (val, skill) => {
                                                    return {name: skill,
                                                        val: <div key={worker.id + project.id} >
                                                            <span style={{width: '100%'}}>
                                                                <input
                                                                    type="checkbox"
                                                                    id={worker.id || ''}
                                                                    checked={data.helpers.getRelation(worker.id, project.id, skill)}
                                                                    onChange={(event) => {
                                                                        data.helpers.modifyRelation(event.target.id, project.id, event.target.checked, skill);
                                                                    }}/>
                                                                {worker.getStatsData(skill)}
                                                            </span>
                                                        </div>};
                                                });
                                                return <div key={worker.id + project.id}>
                                                    <div>{worker.name}</div>
                                                    <StatsBar stats={stats_data} data={this.props.data} />
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="card">
                                        <div className="col slim-left">
                                            {data.projects_known_technologies.map(
                                                (technology, i) => <div key={technology} className="row-md-1">
                                                    <div className="form-check-checkbox slim-margin">
                                                        <span>
                                                            <h5 className="text-center slim">
                                                                <input
                                                                    type="checkbox"
                                                                    id={technology}
                                                                    checked={data.helpers.getTechnology(project.id, technology)}
                                                                    onChange={this.changeTechnology}/>
                                                                {technologies[technology].name}
                                                            </h5>
                                                            <p className="small slim">{technologies[technology].description}</p>
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                            {(current_tick > (24*30*3)) ? Object.keys(technologies).map(
                                                (technology, i) => <div key={technology} className="row-md-1">
                                                    <div className="form-check-checkbox slim-margin small">
                                                        {!data.projects_known_technologies.includes(technology)
                                                            ? <span>
                                                                <h5 className="text-center slim">
                                                                    <button
                                                                        className={technologies[technology].price <= data.money ? "btn btn-success btn-sm" : "btn btn-secondary btn-sm disabled"}
                                                                        onClick={() => { if (technologies[technology].price <= data.money) data.helpers.unlockTechnology(technology); }}
                                                                    >
                                                                        Unlock {technologies[technology].name} {technologies[technology].price}$
                                                                    </button>

                                                                </h5>
                                                                <p className="small slim">{technologies[technology].description}</p>
                                                            </span> : ''}
                                                    </div>
                                                </div>
                                            ) : ''}
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
                    <ProjectDeadlineBar project={project}/>
                    <ProjectProgressBar project={project}/>

                    <StatsBar stats={stats_data} data={this.props.data} />

                    <div>
                        <div > Tasks: {project.tasksQuantity()}/{project.planedTasksQuantity()} </div>
                        <div > Bugs: <span className="text-danger">{project.bugsQuantity()}</span> </div>
                        <div > Complexity: {project.complexity} </div>
                        <div > Iteration: {project.iteration} </div>
                    </div>

                    <div className="project-team">
                        <p>Team: {team_label}
                            <button 
                            className={`btn btn-xs btn-info team-add-worker ${data.project_team_selector === project.id ? 'active' : ''}`}
                            onClick={() => data.helpers.changeTeamSelector(project)}
                            >
                                <i className="fa fa-plus"></i>
                            </button>
                        </p>
                        {data.project_team_selector === project.id ? <div>
                            <Select 
                            onChange={(e) => onSelectChange(e)}
                            options={data.workers.map((worker) => {return {value: worker, label: worker.name}})}
                            value={null}/>
                        </div> : null}
                        {tech.length ? <p className="small slim">Tech: {tech_label}</p> : ''}
                    </div>
                </div>
            </div>
        );
    }
}

export default Project;