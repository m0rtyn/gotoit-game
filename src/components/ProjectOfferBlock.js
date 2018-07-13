import React, { Component } from 'react';
import _ from 'lodash';

import ProjectModel from '../models/ProjectModel';
import StatsBar from './StatsBar';
import ProjectName from './ProjectName';

import {skills} from '../game/knowledge';
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

        const stats_data = _.mapValues(skills, (stat, key) => {
            return {name: key, val: <span>{candidate.needs(key)}</span>};
        });

        return <div key={candidate.id} className="card offered-project">

            <div className="card-header">

                <div className='project-avatar'>
                    <img 
                    className='project-avatar'
                    // alt={project.name + ' avatar'} 
                    // src={require(`../../public/${project_platforms[project.platform].name}.svg`)}
                    src={candidate.avatar.platform}
                    />
                    <img 
                    className='project-avatar'
                    // alt={project.name + ' avatar'} 
                    // src={require(`../../public/${project_kinds[project.kind].name}.svg`)}
                    src={candidate.avatar.kind}
                    />
                </div>
            
                <ProjectName project={candidate}/>

                <div className="btn-group btn-group-xs">
                    <button 
                    className="btn btn-success btn-outline" 
                    id={candidate.id} 
                    onClick={(e) => this.acceptOffered(e, type)}>
                        Accept
                    </button>
                    <button 
                    className="btn btn-warning btn-outline" 
                    id={candidate.id} 
                    onClick={(e) => this.startOffered(e, type)}>
                        Start
                    </button>
                    <button 
                    className="btn btn-danger btn-outline" 
                    id={candidate.id} 
                    onClick={(e) => this.reject(e, type)}>
                        Hide
                    </button>
                </div>
                
            </div>
            <div className="card-body">
                <StatsBar stats={stats_data} data={this.props.data}/>
            </div>
        </div>;
    }
}

export default ProjectOfferBlock;