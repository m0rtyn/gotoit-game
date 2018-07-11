import React, { Component } from 'react';
import _ from 'lodash';

import StatsBar from './StatsBar';
import ProjectName from './ProjectName';

import {skills} from '../game/knowledge';


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

            {/* <div className='project-avatar'>
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
            </div> */}
        
            <ProjectName project={candidate}/>

            <div>
                Deadline: {candidate.getDeadlineText()}
                &nbsp;
                Reward: {candidate.reward}$
                &nbsp;
                {candidate.penalty > 0 ? <span>Penalty: {candidate.penalty}$</span> : ''}
            </div>

            <StatsBar stats={stats_data} data={this.props.data}/>
            
            <div className="btn-group">
                <button className="btn btn-success" id={candidate.id} onClick={(e) => this.acceptOffered(e, type)}>
                    Accept
                </button>
                &nbsp;
                <button className="btn btn-warning" id={candidate.id} onClick={(e) => this.startOffered(e, type)}>
                    Start
                </button>
                &nbsp;
                <button className="btn btn-danger" id={candidate.id} onClick={(e) => this.reject(e, type)}>Hide</button>
            </div>
        </div>;
    }
}

export default ProjectOfferBlock;