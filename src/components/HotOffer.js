import React, { Component } from 'react';
import Portal from 'react-portal';
import _ from "lodash";
import SimpleModal from './SimpleModal';
import ProjectOfferBlock from './ProjectOfferBlock';
import {skills} from "../game/knowledge";
import StatsBar from './StatsBar';
import ProjectName from './ProjectName';


class HotOffer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //   end_screen_project: null
        };

    }
    acceptOffered(event, type) {
        this.props.data.helpers.acceptOffered(event.target.id);
        this.props.closePopup();
    }

    startOffered(event, type) {
        this.props.data.helpers.startOffered(event.target.id);
        this.props.closePopup();
    }

    reject(event, type) {
        this.props.data.helpers.rejectOffered(event.target.id);
        this.props.closePopup();
    }


    render() {
        const data = this.props.data;
        let project = this.props.project;
        const stats_data = _.mapValues(skills, (stat, key) => {
            return {name: key, val: <span>{project.needs(key)}</span>};
        });
        return (
            <div>
                <div>
                    <button className="btn btn-warning float-right" onClick={() => {
                        //data.helpers.projectArchiving();
                        this.props.closePopup();
                    }}>Close</button>
                </div>
                <div>
                    <div className="moat">
                        <h3>{project.lore.name}</h3>
                        <p>
                            {project.lore.text}
                        </p>
                    </div>
                    <div className="moat slim_top">
                        <div key={project.id} className="card">
                            <ProjectName project={project}/>
                            <div>
                                <label>Deadline: {project.getDeadlineText()}</label>&nbsp;
                                <label>Reward: {project.reward}$</label>&nbsp;
                                {project.penalty > 0 ? <label>Penalty: {project.penalty}$</label> : ''}
                            </div>
                            <StatsBar stats={stats_data} data={this.props.data}/>
                            {
                                project.stage === 'ready' ?
                                    <div className="btn-group">
                                        <button className="btn btn-success" id={project.id} onClick={(e) => this.acceptOffered(e)}>
                                            Accept
                                        </button>
                                        &nbsp;
                                        <button className="btn btn-warning" id={project.id} onClick={(e) => this.startOffered(e)}>
                                            Start
                                        </button>
                                        &nbsp;
                                        <button className="btn btn-danger" id={project.id} onClick={(e) => this.reject(e)}>Hide</button>
                                    </div>
                                    : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HotOffer;