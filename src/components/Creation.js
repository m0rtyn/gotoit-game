import React, { Component } from 'react';
import Portal from 'react-portal';
import _ from 'lodash';

import Modal from './Modal';
import StatsBar from './StatsBar';
import bulkStyler from '../services/bulkStyler';

import WorkerModel from '../models/WorkerModel';
import ProjectModel from '../models/ProjectModel';

import { skills_1 } from '../game/knowledge/skills';
import { technologies } from '../game/knowledge/technologies';
import { player_backgrounds } from '../game/knowledge/player_backgrounds';

export var player = null;

class Creation extends Component {
  constructor(props) {
    super(props);

    let back = _.sample(_.keys(player_backgrounds));

    this.state = {
      step: 'welcome', // welcome, creation
      gender: 'male',
      suggest_name: WorkerModel.genName('male'),
      selected_background: back, //'specialist',
      technologist: _.sample(_.keys(player_backgrounds['technologist'].spices)),
      specialist: _.sample(_.keys(player_backgrounds['specialist'].spices)),
      coworker: _.sample(_.keys(player_backgrounds['coworker'].spices)),
      businessman: _.sample(_.keys(player_backgrounds['businessman'].spices))
    };

    this.embark = this.embark.bind(this);
  }
  // shouldComponentUpdate() {
  //   return false;
  // }
  getPlayerStats() {
    let stats = JSON.parse(JSON.stringify(skills_1));

    stats = bulkStyler.playerBackground(stats, this.state.selected_background);

    if (this.state.selected_background === 'specialist') {
      stats = bulkStyler.playerSpeciality(stats, this.state.specialist);
    }

    return stats;
  }

  embark() {
    console.log('embrk');

    let data = this.props.data;
    data.money += player_backgrounds[this.state.selected_background].money;

    let stats = this.getPlayerStats();

    let tmp_player = WorkerModel.generatePlayer(this.state.gender);

    tmp_player.stats = stats;
    tmp_player.name = this.state.suggest_name;

    data.workers[0] = tmp_player; //: [WorkerModel.generatePlayer()]
    player = tmp_player;

    if (this.state.selected_background === 'technologist') {
      data.projects_known_technologies = data.projects_known_technologies.concat(
        this.state.technologist
      );
    } else {
      data.projects_known_technologies = data.projects_known_technologies.concat(
        player_backgrounds[this.state.selected_background].start_tech
      );
    }

    switch (this.state.selected_background) {
      case 'technologist':
        // do nothing
        break;
      case 'specialist':
        console.log(player.items, this.state.specialist);
        player.items[this.state.specialist].exp = true;
        player.items[this.state.specialist].flat = true;
        break;

      case 'coworker':
        switch (this.state.coworker) {
          case 'apprentice':
            data.helpers.hireEmployer(
              WorkerModel.generateWithStats(
                bulkStyler.partnerSpeciality(
                  JSON.parse(JSON.stringify(stats)),
                  'apprentice'
                )
              )
            );
            break;
          case 'helpers':
            data.helpers.hireEmployer(
              WorkerModel.generateWithStats(
                bulkStyler.partnerSpeciality(
                  JSON.parse(JSON.stringify(stats)),
                  'helper1'
                )
              )
            );
            data.helpers.hireEmployer(
              WorkerModel.generateWithStats(
                bulkStyler.partnerSpeciality(
                  JSON.parse(JSON.stringify(stats)),
                  'helper2'
                )
              )
            );
            break;
          case 'full':
            data.helpers.hireEmployer(WorkerModel.generate(1));
            data.helpers.hireEmployer(WorkerModel.generate(1));
            data.helpers.hireEmployer(WorkerModel.generate(1));
            break;
          default:
            console.log('Wrong team?');
        }
        //   data.helpers.hireEmployer(WorkerModel.generate(8));
        data.helpers.changeOffice(2); // data.office = new OfficeModel(2);
        break;

      case 'businessman':
        switch (this.state.businessman) {
          case 'btc':
            data.btc += 5000 / data.current_btc_price;
            break;
          case 'credit':
            data.early_payed_loans += 9200;
            break;
          case 'office':
            data.helpers.changeOffice(3);
            data.office_things.coffeemaker = true;
            data.office_things.lunch = true;
            break;
          default:
            console.log('Wrong biz?');
        }
        break;

      default:
        console.log('Wrong background?');
    }

    // i must hard set :(
    data.helpers.brutalSet({ data: data });

    data.helpers.offerProject(ProjectModel.generate(1, 1, 'player'));
    data.helpers.offerProject(ProjectModel.generate(2, 1, 'player'));
    data.helpers.offerProject(ProjectModel.generate(3, 1, 'player'));

    data.stage = 'game';
    this.refs.creation.closePortal();

    this.props.data.helpers.playGame();
  }

  componentDidMount() {
    this.refs.creation.openPortal();
  }

  handleGenderChange = changeEvent => {
    this.setState({
      gender: changeEvent.target.value,
      suggest_name: WorkerModel.genName(changeEvent.target.value)
    });
  };

  render() {
    const data = this.props.data;
    const selected_background =
      player_backgrounds[this.state.selected_background];
    //const worker = data.workers[0];

    let stats = this.getPlayerStats();

    const stats_data = _.mapValues(stats, (val, key) => {
      return { name: key, val: stats[key] };
    });

    return (
      <div>
        {data.stage === 'start' ? (
          <Portal ref="creation">
            <Modal>
              {this.state.step === 'welcome' ? (
                <div className="modal-content creation">
                  <div className="modal-header">
                    <h1 className="modal-title">Go To IT</h1>
                    <h2 className="subtitle">
                      Game About Software Development
                    </h2>
                  </div>
                  <div className="modal-body">
                    <p className="lead">
                      This game is about software development and the rise of
                      your company to the heights.
                      <br />
                      Start with small contracts, save up some money, hire a
                      couple of assistants and try to create something really
                      cool!
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-success btn-lg"
                      onClick={() => {
                        this.setState({ step: 'creation' });
                      }}
                    >
                      Create Your Company!
                    </button>
                  </div>
                </div>
              ) : (
                <div className="modal-content creation">
                  <div className="modal-body">
                    <section className="card creation-person">
                      <div className="card-body">
                        <img
                          className="player-avatar"
                          alt="player's avatar"
                          src="../assets/images/male.png"
                        />
                        <div className="creation-gender-select">
                          <h3 className="text-center modal-title">
                            Choose gender
                          </h3>
                          <input
                            className="form-check-input"
                            id="male-gender-radio-button"
                            type="radio"
                            value="male"
                            checked={this.state.gender === 'male'}
                            onChange={this.handleGenderChange}
                          />
                          <label
                            className="form-check-label btn btn-sm"
                            htmlFor="male-gender-radio-button"
                          >
                            Male
                          </label>

                          <input
                            className="form-check-input"
                            id="female-gender-radio-button"
                            type="radio"
                            value="female"
                            checked={this.state.gender === 'female'}
                            onChange={this.handleGenderChange}
                          />
                          <label
                            className="form-check-label btn btn-sm"
                            htmlFor="female-gender-radio-button"
                          >
                            Female
                          </label>
                        </div>
                        <div>
                          <h3 className="text-center modal-title">Your name</h3>
                          <div className="input-group creation-player-name ">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="fa fa-user" id="sizing-addon1" />
                              </span>
                            </div>
                            <input
                              type="text"
                              name="background"
                              className="form-control"
                              value={this.state.suggest_name}
                              onChange={event => {
                                this.setState({
                                  suggest_name: event.target.value
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="card creation-background">
                      <div className="card-body">
                        <div className="creation-background-select">
                          <div className="creation-select-column">
                            {Object.keys(player_backgrounds).map(background => {
                              return (
                                <div key={background}>
                                  <input
                                    className="form-check-input"
                                    id={background + '-radio-button'}
                                    type="radio"
                                    name="background"
                                    value={background}
                                    checked={
                                      this.state.selected_background ===
                                      background
                                    }
                                    onChange={event => {
                                      this.setState({
                                        selected_background: event.target.value
                                      });
                                    }}
                                  />
                                  <label
                                    className="form-check-label btn btn-sm"
                                    htmlFor={background + '-radio-button'}
                                  >
                                    {player_backgrounds[background].name}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                          <div className="creation-description-column">
                            <h3 className="text-center modal-title">
                              Choose background
                            </h3>

                            <div className="creation-description lead text-center">
                              {
                                player_backgrounds[
                                  this.state.selected_background
                                ].text
                              }
                              <br />
                              Start tech:{' '}
                              {'technologist' === this.state.selected_background
                                ? 'Agile, Test Drive Development or Refactoring'
                                : technologies[
                                    player_backgrounds[
                                      this.state.selected_background
                                    ].start_tech
                                  ].name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="card creation-technology">
                      <div className="card-body">
                        <div className="creation-might-select">
                          <div className="creation-select-column">
                            {Object.keys(selected_background.spices).map(
                              spice => {
                                return (
                                  <div key={spice} className="">
                                    <input
                                      className="form-check-input"
                                      id={spice + '-radio-button'}
                                      type="radio"
                                      name="spice"
                                      value={spice}
                                      checked={
                                        this.state[
                                          this.state.selected_background
                                        ] === spice
                                      }
                                      onChange={event => {
                                        const state = {};
                                        state[this.state.selected_background] =
                                          event.target.value;
                                        this.setState(state);
                                      }}
                                    />
                                    <label
                                      className="form-check-label btn btn-sm"
                                      htmlFor={spice + '-radio-button'}
                                    >
                                      {selected_background.spices[spice].name}
                                    </label>
                                  </div>
                                );
                              }
                            )}
                          </div>
                          <div className="creation-description-column">
                            <h3 className="text-center modal-title">
                              Start {selected_background.might}:
                            </h3>
                            <div className="creation-description lead text-center">
                              {
                                selected_background.spices[
                                  this.state[this.state.selected_background]
                                ].description
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="card creation-skills">
                      <div className="card-body">
                        <div className="creation-start-skills">
                          <h3 className="text-center modal-title">
                            Your start skills:
                          </h3>
                          <StatsBar stats={stats_data} data={data} />

                          {/* <StatsProgressBar type={'design'} hideCheckbox={true} max_stat={data.max_stats_projects_offered} stats={stats_progressbar_data} worker={candidate} data={data}/>
                                                    <StatsProgressBar type={'program'} hideCheckbox={true} max_stat={data.max_stats_projects_offered} stats={stats_progressbar_data} worker={candidate} data={data}/>
                                                    <StatsProgressBar type={'manage'} hideCheckbox={true} max_stat={data.max_stats_projects_offered} stats={stats_progressbar_data} worker={candidate} data={data}/> */}
                        </div>
                      </div>
                    </section>
                  </div>
                  <div className="modal-footer mx-auto">
                    <button
                      className="btn btn-success btn-lg btn-"
                      onClick={this.embark}
                    >
                      Embark
                    </button>
                  </div>
                </div>
              )}
            </Modal>
          </Portal>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Creation;
