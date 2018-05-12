import React, { Component } from 'react';
import Portal from 'react-portal';
import _ from 'lodash';

import TeamDialog from './TeamDialog';
import StatsBar from './StatsBar';
import ProjectName from './ProjectName';

//import {addAction} from '../components/ToastNest';

import {skills_names, workers_bonus_items, roles, education} from '../data/knowledge';

class Worker extends Component {
    constructor(props) {
        super(props);
        this.manage = this.manage.bind(this);
        this.manageAll = this.manageAll.bind(this);
        this.dismiss = this.dismiss.bind(this);
        this.changeRole = this.changeRole.bind(this);
    }

    componentDidMount() {
        /*
        if (this.props.worker.is_player) {
            addAction('This is the management screen of your character. Here you can select their roles in the company. Review carefully information on this screen, then try a Training Project.', {timeOut: 10000, extendedTimeOut: 5000}, 'success');
        }
        */
        //this.refs.manage.openPortal();
    }

    manage(event) {
        this.props.data.helpers.modifyRelation(this.props.worker.id, event.target.id, event.target.checked);
    }

    manageAll(event) {
        this.props.data.helpers.modifyRelation(this.props.worker.id, null, event.target.checked);
    }

    dismiss() {
        this.props.data.helpers.dismissEmployer(this.props.worker.id);
    }

    changeRole(event) {
        this.props.data.helpers.changeRole(this.props.worker.id, event.target.id, event.target.checked);
    }

    teach(skill, source) {
      //  console.log(skill, source);

        switch (source) {
            case 'training':
                this.props.data.helpers.trainingProject(this.props.worker, skill);
                break;
            default:
                console.log('WTF?');
        }
    }

    render() {
        const data = this.props.data;
        const worker = this.props.worker;

        const manage_button = <button className="btn btn-success btn-sm">Manage</button>;

        const stats_data = _.mapValues(worker.stats, (val, stat) => {
            return {
                name: stat,
                val: worker.getStatsData(stat)
            };
        });

        const efficiency_data = {
            work_load: {name: 'Work Load', val: worker.workloadPenalty()},
            work_difficulty: {name: 'Task Difficulty', val: worker.difficultyPenalty()},
            education: {name: 'Education Balance', val: worker.educationPenalty()},
            collective: {name: 'Collective', val: worker.collectivePenalty()}
        };

        const efficiency_bar_style = (() => {
            let ratio = worker.getEfficiency() / 100;
            switch (true) {
                case ratio <= 0.5: return 'progress-bar-danger';
                case ratio <= 0.75: return 'progress-bar-warning';
                case ratio <= 1: return 'progress-bar-success';
                case ratio  > 1: return 'progress-bar-success'; // High bonus
                default: //alert('broken ratio: '+ratio);
            }
        }) ();

        const vacation_bar_style = (() => {
            let ratio = worker.stamina / 1000;
            switch (true) {
                case ratio <= 0.33: return 'progress-bar-danger';
                case ratio <= 0.66: return 'progress-bar-warning';
                case ratio <= 1: return 'progress-bar-success';
                case ratio  > 1: return 'progress-bar-success'; // High bonus
                default: //alert('broken ratio: '+ratio);
            }
        }) ();

        return (
            <div className="well well-sm fat">
                {worker.name} {worker.is_player ? 'Player' : <span>{worker.getSalary()}$</span>}
                {worker.in_vacation ? ' on vacation! ' : ''}

                <Portal ref="manage" closeOnEsc closeOnOutsideClick openByClickOn={manage_button}>
                    <TeamDialog>
                        <h2>
                            {worker.name}
                            {worker.in_vacation ? ' on vacation! ' : ''}
                        </h2>

                        <div className="panel panel-success text-center">
                            {worker.is_player ? '' : <span>Worker salary: ${worker.getSalary()}. Overrate bonus: {worker.getOverrate()}%.
                            <button className="btn btn-danger btn-link" onClick={() => { data.helpers.riseEmployer(worker.id)}}>Rise Salary</button></span>}
                        </div>

                        <ul>
                            <p>Hired {Math.ceil((this.props.data.date.tick - worker.facts.tick_hired)/24)} days ago.
                                {!worker.is_player ? <span>Got {worker.facts.money_earned}$ of salary.</span> : ''}
                                Finished {worker.facts.project_finished} project.
                                Did {worker.facts.tasks_done} of {worker.facts.tasks_done + worker.facts.bugs_passed} tasks.
                                Passed {worker.facts.bugs_passed} bugs.
                                Did {worker.facts.refactored} refactoring, wrote {worker.facts.tests_wrote} tests and retrospected {worker.facts.retrospected} tasks.
                            </p>
                        </ul>

                        <div className="panel panel-success text-center filament">
                            <div className="row filament">
                                <div className="col-md-2">Happiness</div>
                                <div className="col-md-9 progress slim">
                                    <div className={efficiency_bar_style} role="progressbar"
                                         style={{width: Math.min(100, worker.getEfficiency())+'%'}}>
                                        <label className="text-sm">{worker.getEfficiency()}%</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row filament">
                                <div className="col-md-2">Stamina</div>
                                <div className="col-md-9 progress slim">
                                    <div className={vacation_bar_style} role="progressbar"
                                         style={{width: Math.min(100, worker.stamina/50)+'%'}}>
                                        <label>{Math.floor(worker.stamina/50)}%</label>
                                    </div>
                                </div>
                            </div>
                            <StatsBar stats={efficiency_data} data={this.props.data} />
                            <p5>
                                {worker.tellFeelings()}

                                {(worker.in_vacation || worker.to_vacation)
                                    ? worker.in_vacation ? ' Worker on vacation! ' : ' Going on vacation in ' + Math.floor(worker.to_vacation_ticker/24) + ' days. '
                                    : <button className="btn btn-link" onClick={() => { worker.proposeVacation()}}>Propose Vacation</button>}
                            </p5>
                        </div>

                        <div className="panel panel-success text-center">
                            <div className="checkbox-inline">
                                <label>
                                    <input
                                        type="checkbox"
                                        id={worker.id}
                                        checked={worker.accept_default}
                                        onChange={(e) => {
                                            worker.accept_default = e.target.checked;
                                            this.manageAll(e);
                                        }}/>
                                    Auto join to new projects
                                </label>
                            </div>
                            <div className="flex-container-row slim">
                                {skills_names.map((role, i) =>
                                    <div key={role} className="checkbox flex-element slim">
                                        <label>
                                            <input
                                                type="checkbox"
                                                id={role}
                                                checked={this.props.data.helpers.getRole(worker.id, role)}
                                                onChange={this.changeRole}/>
                                            <span>as {roles[role].profession_name} </span>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="panel panel-success text-center">
                            <StatsBar stats={stats_data} data={this.props.data} />

                            {/*    bonus items */}
                            <div>
                                <div className="flex-container-row">
                                {skills_names.map((skill) => {
                                    return <div className="flex-element flex-container-column" key={skill}>
                                        {Object.keys(workers_bonus_items[skill]).map((item_key) => {
                                            let item = workers_bonus_items[skill][item_key];
                                            return worker.items[skill][item_key] === true
                                                ? <div className="flex-element" key={item_key}>
                                                        <label className='badge'>{item.name} {item.description}</label>
                                                    </div>
                                                : <div className="flex-element" key={item_key}>
                                                    <button
                                                        className={data.money >= item.money ? "btn btn-info btn-xs" : "btn btn-info btn-xs disabled"}
                                                        title={item.description} id={item} onClick={() => {
                                                        if (data.money >= item.money) {
                                                            data.helpers.buyItem(worker, skill, item_key);
                                                        }
                                                    }}>Buy {item.name} ${item.money}</button>
                                                </div>
                                            })
                                        }
                                    </div>
                                    })}
                                </div>
                            </div>
                        </div>

                        {/*    deprecated training project */}
                        <div>
                            <div className="panel panel-info text-center">
                                {Object.keys(education).map((source) =>
                                    ((!education[source].hide)
                                        ? <div className="flex-container-row" key={source}>
                                        {skills_names.map((skill) => {
                                            return <div  className="flex-element" key={skill}>
                                                <button className="btn btn-info" title={education[source].description} id={source} onClick={() => this.teach(skill, source)}>{education[source].name}</button>
                                            </div>;
                                        })}
                                    </div>
                                        : '')
                                )}
                            </div>
                        </div>

                        <div>
                            {/*    Which projects {worker.name} has to work?   */}
                            <div className="panel panel-info">
                                {data.projects.map((project) => {
                                        const stats_data = _.mapValues(project.needs, (val, skill) => {
                                            return {name: skill,
                                                val: <div key={worker.id + project.id} className="checkbox-inline">
                                                    <label style={{width: '100%'}}>
                                                        <input
                                                            type="checkbox"
                                                            id={project.id || ''}
                                                            checked={data.helpers.getRelation(worker.id, project.id, skill)}
                                                            onChange={(event) => {
                                                                data.helpers.modifyRelation(worker.id, event.target.id, event.target.checked, skill);
                                                            }}/>
                                                        {project.needs(skill) +'/'+ project.estimate[skill]}
                                                    </label>
                                                </div>};
                                        });
                                        return <div key={worker.id + project.id}>
                                            <div><ProjectName project={project} /></div>
                                            <StatsBar stats={stats_data} data={this.props.data} />
                                        </div>
                                    }
                                )}
                            </div>
                        </div>
                        <div>
                            {worker.is_player ? '' :
                                <button className="btn btn-danger btn-sm" onClick={this.dismiss}>Dismiss an
                                    employee</button>}
                        </div>
                    </TeamDialog>
                </Portal>

                <div className="progress filament">
                    {/* <div classNames('progress-bar', (100 / worker.getEfficiency() < 0.5 ? 'progress-bar-danger' : 'progress-bar-warning')) role="progressbar"  */}
                    <div className={efficiency_bar_style} role="progressbar"
                         style={{width: Math.min(100, worker.getEfficiency())+'%'}}>
                        <label>Happiness {worker.getEfficiency()}%</label>
                    </div>
                </div>
                <div className="progress filament">
                    <div className={vacation_bar_style} role="progressbar"
                         style={{width: Math.min(100, worker.stamina/50)+'%'}}>
                        <label>Stamina {Math.floor(worker.stamina/50)}%</label>
                    </div>
                </div>

                <StatsBar stats={stats_data} data={this.props.data} />
            </div>
        );
    }
}

export default Worker;
