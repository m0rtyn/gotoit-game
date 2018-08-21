import React, { Component } from 'react';
import { current_tick } from '../../App';

import { meetings } from '../../game/knowledge/meetings';
import { technologies } from '../../game/knowledge/technologies';

class StartMeeting extends Component {
  constructor(props) {
    super(props);

    this.state = { selected_workers: {} };
  }

  render() {
    const data = this.props.data;

    return (
      <div>
        <h3 className="text-center">Start Meeting</h3>

        <div className="row filament">
          <div className="slim col-md-4">
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
            {Object.keys(technologies).map((technology, i) => {
              const meeting = meetings[technologies[technology].meeting];
              return (
                <div key={technology}>
                  {!data.projects_known_technologies.includes(technology) ? (
                    <div className={current_tick > 24 * 30 * 3 ? '' : 'hidden'}>
                      <div className="card">
                        <button className="btn btn-secondary btn-sm disabled">
                          {meeting.name}
                        </button>{' '}
                        <span>
                          <button
                            className={
                              technologies[technology].price <= data.money
                                ? 'btn btn-success btn-sm'
                                : 'btn btn-secondary btn-sm disabled'
                            }
                            onClick={() => {
                              if (technologies[technology].price <= data.money)
                                data.helpers.unlockTechnology(technology);
                            }}
                          >
                            Unlock {technologies[technology].name}{' '}
                            {technologies[technology].price}$
                          </button>
                        </span>
                        <p className="small">{meeting.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            data.helpers.startMeeting(
                              technologies[technology].meeting,
                              this.state.selected_workers
                            );
                          }}
                        >
                          {meeting.name}
                        </button>{' '}
                        Duration: {meeting.deadline} hours. Effectiveness:{' '}
                        {meeting.max_bonus} hours.
                      </div>
                      <p className="small">{meeting.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default StartMeeting;
