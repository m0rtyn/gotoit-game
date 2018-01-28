import React, { Component } from 'react';
import Portal from 'react-portal';

import _ from 'lodash';
import classNames from 'classnames';

import TeamDialog from './TeamDialog';


class Meeting extends Component {
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

        const manage_button = <button className="btn flex-element">Manage</button>;

        let label = (id, text) => { return <span key={id}> <label className="label-default">{text}</label> </span>; };

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
            if (worker.id in team_ids) { team.push(worker); }
        });
        const team_label = team.map((worker) => { return label(worker.id, worker.name); });

        const start_pause_button =
            <span>
                {/*{project.stage}*/}
                {(project.stage === 'paused')
                    ? <button className="btn btn-success" onClick={this.unpause}>Start</button> : ''}
                {(project.stage === 'ready')
                    ? <button className="btn btn-success" onClick={this.open}>Start</button> : ''}
                {project.stage === 'open'
                    ? <button className="btn btn-warning" onClick={this.pause}>Pause</button> : ''}
            </span>;

        const reject_button = <button className="btn btn-danger" onClick={() => {
            if (confirm("Reject project "+project.name+'? (penalty: '+project.penalty+')')) {
                this.close();
            } }}>Reject</button>;

        return (
            <div className="well well-sm fat">
                <div className="flex-container-row">
                    <label className="flex-element"> {project.name} </label>
                    <label className="flex-element"> Reward: {project.reward}$ </label>
                    {(project.penalty > 0 ? <label className="flex-element"> Penalty: {project.penalty}$ </label> : ' ')}
                    <div>
                        {start_pause_button}
                        {reject_button}
                        <Portal ref="manage" closeOnEsc openByClickOn={manage_button}>
                            <TeamDialog>
                                <h4 className="flex-container-row">
                                    <label className="flex-element"> {project.name} </label>
                                    <div className="flex-element"> <label> {start_pause_button} {reject_button} </label> </div>
                                </h4>
                                <div className="row">
                                    <div className="col-md-8">
                                        <div>
                                            {project.deadline > 0 ? <div key="deadline" className="row">
                                                <div className="col-md-2">Deadline</div>
                                                <div className="col-md-10 progress">
                                                    <div className={classNames('progress-bar', (project.deadline / project.deadline_max < 0.1 ? 'progress-bar-danger' : 'progress-bar-warning'))} role="progressbar"
                                                         style={{width: (100-(project.deadline / project.deadline_max * 100))+'%'}}>
                                                        <label>{project.deadline_max - project.deadline} hours</label>
                                                    </div>
                                                    <div className="progress-bar progress-bar-success" role="progressbar"
                                                         style={{width: (project.deadline / project.deadline_max * 100)+'%'}}>
                                                        <label>{project.deadline} hours</label>
                                                    </div>
                                                </div>
                                            </div> : ''}

                                        </div>
                                        <div className="panel panel-success">
                                            {this.props.data.workers.map((worker) => {
                                                return <div key={worker.id + project.id} className="panel filament">
                                                    <label className="checkbox-inline" style={{width: '100%'}}>
                                                        <input
                                                            type="checkbox"
                                                            id={worker.id}
                                                            checked={data.helpers.getRelation(worker.id, project.id, 'meeting')}
                                                            onChange={(event) => {
                                                                data.helpers.modifyRelation(event.target.id, project.id, event.target.checked, 'meeting');
                                                            }}/>
                                                        <h4>{worker.name}</h4>
                                                    </label>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </TeamDialog>
                        </Portal>
                    </div>
                </div>

                {project.deadline > 0 ?
                    <div className="progress slim">
                        <div className={classNames('progress-bar', (project.deadline / project.deadline_max < 0.1 ? 'progress-bar-danger' : 'progress-bar-warning'))} role="progressbar"
                             style={{width: (100-(project.deadline / project.deadline_max * 100))+'%'}}>
                            <label>{project.deadline_max - project.deadline} gone</label>
                        </div>
                        <div className="progress-bar progress-bar-success" role="progressbar"
                             style={{width: (project.deadline / project.deadline_max * 100)+'%'}}>
                            <label>{project.deadline} to deadline</label>
                        </div>
                    </div> : ''
                }

                <div className="small slim">
                    <p className="small slim">Team: {team_label}</p>
                </div>
            </div>
        );
    }
}

export default Meeting;
