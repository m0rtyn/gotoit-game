import React, { Component } from 'react';

import ReactBootstrapSlider from 'react-bootstrap-slider';
import '../../../node_modules/react-bootstrap-slider/src/css/bootstrap-slider.min.css';

import _ from 'lodash';

import ProjectModel from '../../models/ProjectModel';

import {
  project_kinds,
  project_platforms
} from '../../game/knowledge/projects';

class StartProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected_workers: {},
      project_name: '',
      project_platform: 'desktop',
      project_kind: 'application'
    };
  }

  componentDidMount() {
    const data = this.props.data;
    const workers = _.map(data.workers, 'id');
    const workers_true = {}; // _.mapValues(workers, () => { return true; });
    _.each(workers, worker_id => {
      workers_true[worker_id] = true;
    });

    console.log(workers, workers_true);
    this.setState({
      selected_workers: workers_true,
      project_name: ProjectModel.genName(),
      project_platform: 'desktop',
      project_kind: 'application'
    });
    console.log('on open');
  }

  render() {
    return (
      <div>
        <h3 className="text-center">Start Project</h3>

        <div className="row filament">
          <div className="col-md-4">
            {this.props.data.workers.map(worker => {
              return (
                <span key={worker.id} style={{ width: '100%' }}>
                  <h4>
                    <input
                      type="checkbox"
                      id={worker.id || 0}
                      checked={this.state.selected_workers[worker.id] || false}
                      onChange={event => {
                        let state = JSON.parse(JSON.stringify(this.state));
                        state.selected_workers[worker.id] =
                          event.target.checked;
                        this.setState(state);
                      }}
                    />{' '}
                    {worker.name}
                  </h4>
                </span>
              );
            })}
          </div>

          <div className="slim col-md-8">
            <h4 className="text-center">
              Project name:{' '}
              <input
                type="text"
                className="form-inline"
                value={this.state.project_name}
                onChange={event => {
                  this.setState({ project_name: event.target.value });
                }}
              />
            </h4>
            <div className="card text-center">
              <h4 className="text-center">Project platform</h4>
              {this.props.data.projects_unlocked_platforms.map(
                (platform, i) => {
                  return (
                    <div key={i}>
                      <input
                        className="form-check-input"
                        id={platform + '-radio-button'}
                        type="radio"
                        name="platform"
                        value={platform}
                        checked={this.state.project_platform === platform}
                        onChange={e => {
                          this.setState({
                            project_platform: e.target.value
                          });
                        }}
                      />
                      <label
                        className="form-check-label btn btn-sm"
                        htmlFor={platform + '-radio-button'}
                      >
                        {platform}
                      </label>
                    </div>
                  );
                }
              )}
              <p className="filament">
                {project_platforms[this.state.project_platform].description}
              </p>
              {/*<ReactBootstrapSlider
                value={this.state.project_platform}
                change={e => {
                  this.setState({ project_platform: e.target.value });
                }}
                tooltip="hide"
                step={1}
                min={0}
                max={3}
                ticks={[0, 1, 2, 3]}
                ticks_labels={_.map(project_platforms, 'name')}
              />*/}
            </div>
            <div className="card text-center">
              <h4 className="text-center">Project kind</h4>
              {Object.keys(project_kinds).map((kind, i) => {
                return (
                  <div key={i}>
                    <input
                      className="form-check-input"
                      id={kind + '-radio-button'}
                      type="radio"
                      name="kinds"
                      value={kind}
                      checked={this.state.project_kind === kind}
                      onChange={e => {
                        this.setState({
                          project_kind: e.target.value
                        });
                      }}
                    />
                    <label
                      className="form-check-label btn btn-sm"
                      htmlFor={kind + '-radio-button'}
                    >
                      {kind}
                    </label>
                  </div>
                );
              })}
              <p className="filament">
                {project_kinds[this.state.project_kind].description}
              </p>
              {/*<ReactBootstrapSlider
                value={this.state.project_kind}
                change={e => {
                  this.setState({ project_kind: e.target.value });
                }}
                tooltip="hide"
                step={1}
                min={0}
                max={6}
                ticks={[0, 1, 2, 3, 4, 5, 6]}
                ticks_labels={_.map(project_kinds, 'name')}
              />*/}
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            className="big btn-success btn-lg"
            onClick={() => {
              this.props.data.helpers.startProject(
                this.state.project_name,
                this.state.selected_workers,
                this.state.project_platform,
                this.state.project_kind
              );
            }}
          >
            Start Project
          </button>
        </div>
      </div>
    );
  }
}

export default StartProject;
