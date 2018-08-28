import React, { Component } from 'react';
import { skills } from '../game/knowledge/skills';
import { project_offer_will_expire_after } from '../game/knowledge/projects';
import _ from 'lodash';
import StatsBar from './StatsBar';

import ProjectName from './Projects/ProjectName';
import { current_tick } from '../App';
import { Avatar } from './Projects/Avatar';

class Offer extends Component {
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
    this.props.expired = true;
    this.props.closePopup();
  }

  render() {
    let project = this.props.project;
    let createdAt = this.props.createdAt;
    let expired = this.props.expired;
    let hours_to_expire = Math.round(
      createdAt + project_offer_will_expire_after - current_tick
    );

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
            <span
              style={{ position: 'relative', width: '200px', height: '200px' }}
            >
              <Avatar
                name={project.name}
                style={{ position: 'absolute' }}
                size={200}
                sources={_.toPairs(project.avatar)}
              />
            </span>
            <span className="flex-grow">
              <ProjectName project={project} />
              <div>
                <span>Deadline: {project.getDeadlineText()}</span>
                <span>
                  <h4 className="project-reward text-success">
                    {' '}
                    Reward: ${project.reward}
                  </h4>
                </span>
                {project.penalty > 0 ? (
                  <span>
                    {' '}
                    <h4 className="project-penalty text-warning">
                      Penalty : ${project.penalty}
                    </h4>
                  </span>
                ) : (
                  ' '
                )}
              </div>
            </span>
          </div>
          <div className="moat slim_top">
            <div key={project.id} className="card">
              <StatsBar stats={stats_data} data={this.props.data} />

              {project.stage === 'ready' ? (
                !expired ? (
                  <div>
                    <h3>{`Will expire in ${hours_to_expire} hours`}</h3>
                    <div className="btn-group">
                      <button
                        className="btn btn-success"
                        id={project.id}
                        onClick={e => this.acceptOffered(e)}
                      >
                        Accept
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-warning"
                        id={project.id}
                        onClick={e => this.startOffered(e)}
                      >
                        Start
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        id={project.id}
                        onClick={e => this.reject(e)}
                      >
                        Hide
                      </button>
                    </div>
                  </div>
                ) : (
                  'This offer has expired'
                )
              ) : (
                'You already took this offer'
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Offer;
