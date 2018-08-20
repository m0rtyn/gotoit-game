import React, { Component } from 'react';

import ProjectOfferBlock from '../ProjectOfferBlock';

import PublicRelations from '../content/PublicRelations';
import SalesAgency from '../SalesAgency';
import Bar from '../Bar/Bar';
import { colors } from '../../game/knowledge/colors';

class ProjectsFind extends Component {
  render() {
    const data = this.props.data;
    let offered = candidate => {
      return (
        <ProjectOfferBlock
          key={candidate.id}
          candidate={candidate}
          data={this.props.data}
        />
      );
    };
    const reputation_bar = [
      {
        name: 'Reputation',
        width: Math.min(100, data.reputation),
        color: colors.orange,
        value: Math.ceil(data.reputation * 100) / 100,
        id: 'reputation'
      }
    ];
    console.log(this.props.data.offered_projects);

    return (
      <div className="project-find">
        <h3 className="text-center">Find Projects</h3>

        <h4>
          Reputation
          <PublicRelations data={this.props.data} />
        </h4>

        <div className="reputation card flexbox">
          <div className="card-body">
            <Bar
              className="reputation-bar progress-lg"
              bar_data={reputation_bar}
            />
          </div>
        </div>

        <h4>
          Offered Projects
          <SalesAgency data={this.props.data} />
        </h4>

        {this.props.data.offered_projects.map(offered)}
      </div>
    );
  }
}

export default ProjectsFind;
