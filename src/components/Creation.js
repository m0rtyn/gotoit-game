import React, { Component } from 'react';
import Portal from 'react-portal';
import _ from 'lodash';

import SimpleModal from './SimpleModal';
import StatsBar from './StatsBar';
import bulkStyler from '../services/bulkStyler';

import WorkerModel from '../models/WorkerModel';
import ProjectModel from '../models/ProjectModel';

import {player_backgrounds, technologies, skills_1} from '../game/knowledge';

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
            businessman: _.sample(_.keys(player_backgrounds['businessman'].spices)),
        };


        this.embark = this.embark.bind(this);
    }

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
            data.projects_known_technologies = data.projects_known_technologies.concat(this.state.technologist);
        }
        else {
            data.projects_known_technologies = data.projects_known_technologies.concat(player_backgrounds[this.state.selected_background].start_tech);
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
                        data.helpers.hireEmployer(WorkerModel.generateWithStats(bulkStyler.partnerSpeciality(JSON.parse(JSON.stringify(stats)), 'apprentice')));
                        break;
                    case 'helpers':
                        data.helpers.hireEmployer(WorkerModel.generateWithStats(bulkStyler.partnerSpeciality(JSON.parse(JSON.stringify(stats)), 'helper1')));
                        data.helpers.hireEmployer(WorkerModel.generateWithStats(bulkStyler.partnerSpeciality(JSON.parse(JSON.stringify(stats)), 'helper2')));
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
        data.helpers.brutalSet({data: data});

        data.offered_projects.push(ProjectModel.generate(1, 1, 'player'));
        data.offered_projects.push(ProjectModel.generate(2, 1, 'player'));
        data.offered_projects.push(ProjectModel.generate(3, 1, 'player'));

        data.stage = 'game';
        this.refs.creation.closePortal();

        this.props.data.helpers.playGame();
    }

    componentDidMount() {
        this.refs.creation.openPortal();
    }

    handleGenderChange = (changeEvent) => {
        this.setState({
            gender: changeEvent.target.value,
            suggest_name: WorkerModel.genName(changeEvent.target.value)
        })
    }

    render() {
        const data = this.props.data;
        const selected_background = player_backgrounds[this.state.selected_background];
        //const worker = data.workers[0];

        let stats = this.getPlayerStats();

        const stats_data = _.mapValues(stats, (val, key) => {
            return {name: key, val: stats[key]};
        });

       /* const modal = this.state.step === 'welcome'
            ? <div>
                <h3 className="text-center">Go To IT</h3>
                <h4 className="text-center">Game About Software Development</h4>
                <div className="card">
                    <p>This game is about software development and the rise of your company to the heights.</p>
                    <p>Start with small contracts, save up some money, hire a couple of assistants and try to create something really cool!</p>
                </div>
                <div className="text-center">
                    <button className="big btn-success btn-lg" onClick={() => { this.setState({step: 'creation'}) }}>Create Your Company!</button>
                </div>
            </div>
            : <div>
                <h3 className="text-center">
                                            <span className="form-check">
                                                <input className="form-check-input" type="radio"
                                                       value="male" checked={this.state.gender === 'male'}
                                                       onChange={this.handleGenderChange}
                                                />
                                                        Male
                                            </span>
                    <span className="form-check">
                                                <input className="form-check-input" type="radio" value="female"
                                                       checked={this.state.gender === 'female'}
                                                       onChange={this.handleGenderChange}
                                                />
                                                        Female
                                            </span>
                </h3>
                <h3 className="text-center">
                    Choose <input type="text" name="background" className="form-inline"
                                  value={this.state.suggest_name}
                                  onChange={(event) => {
                                      this.setState({suggest_name: event.target.value})
                                  }}
                                  onKeyPress={(event) => {
                                      event.target.style.width = ((event.target.value.length + 2) * 14) + 'px';
                                  }}
                /> background
                </h3>
                <div className="card slim">
                    <div className=" slim">
                        {Object.keys(player_backgrounds).map((background) => {
                            return <div key={background} className=" slim">
                                <div className="radio text-center slim">
                                    <span className="slim">
                                        <h3 className="text-center">
                                            <input type="radio" name="background" value={background}
                                                   checked={this.state.selected_background === background}
                                                   onChange={(event) => {
                                                       this.setState({selected_background: event.target.value})
                                                   }}/>
                                            {player_backgrounds[background].name}
                                        </h3>
                                    </span>
                                </div>
                            </div>
                        })}
                    </div>
                    <div>
                        <p className="text-center slim">{player_backgrounds[this.state.selected_background].text}</p>
                        <p className="text-center slim"> Start tech: {('technologist' === this.state.selected_background) ? "Agile, Test Drive Development or Refactoring" : technologies[player_backgrounds[this.state.selected_background].start_tech].name} </p>
                    </div>
                </div>
                <div className="card slim">
                    <div className="text-center slim">
                        <h4 className="text-center filament">Start {selected_background.might}:</h4>
                        <div className=" slim">
                            {Object.keys(selected_background.spices).map((spice) => {
                                return <div key={spice} className=" slim">
                                    <div className="radio text-center slim">
                                        <span className="slim">
                                            <h3 className="text-center slim-top">
                                                <input type="radio" name="spice" value={spice}
                                                       checked={this.state[this.state.selected_background] === spice}
                                                       onChange={(event) => {
                                                           const state = {};
                                                           state[this.state.selected_background] = event.target.value;
                                                           this.setState(state);
                                                       }}/>
                                                {selected_background.spices[spice].name}
                                            </h3>
                                        </span>
                                    </div>
                                </div>
                            })}
                        </div>
                        <p className="text-center">{selected_background.spices[this.state[this.state.selected_background]].description}</p>
                    </div>
                </div>
                <div className="card slim">
                    <h4 className="text-center slim-top">
                        <p className="filament">Your start skills:</p>
                        <StatsBar stats={stats_data} data={data}/>
                    </h4>
                </div>
                <div className="text-center">
                    <button className="big btn-success btn-lg" onClick={this.embark}>Embark</button>
                </div>
            </div>;
        if ( data.stage === 'start') {
            data.helpers.createPopup('none', modal)
        }*/

        return (
                <div>
                    {(data.stage === 'start') ?
                        <Portal ref="creation">
                            <SimpleModal>
                                {this.state.step === 'welcome' ?
                                    <div>
                                        <h3 className="text-center">Go To IT</h3>
                                        <h4 className="text-center">Game About Software Development</h4>
                                        <div className="card">
                                            <p>This game is about software development and the rise of your company to the heights.</p>
                                            <p>Start with small contracts, save up some money, hire a couple of assistants and try to create something really cool!</p>
                                        </div>
                                        <div className="text-center">
                                            <button className="big btn-success btn-lg" onClick={() => { this.setState({step: 'creation'}) }}>Create Your Company!</button>
                                        </div>
                                    </div>

                                    :
                                    <div>
                                        <h3 className="text-center">
                                            <span className="form-check">
                                                <input className="form-check-input" type="radio"
                                                       value="male" checked={this.state.gender === 'male'}
                                                       onChange={this.handleGenderChange}
                                                />
                                                        Male
                                            </span>
                                            <span className="form-check">
                                                <input className="form-check-input" type="radio" value="female"
                                                       checked={this.state.gender === 'female'}
                                                       onChange={this.handleGenderChange}
                                                />
                                                        Female
                                            </span>
                                        </h3>
                                    <h3 className="text-center">
                                        Choose background
                                        <input 
                                        type="text" 
                                        name="background" 
                                        className="form-inline"
                                        value={this.state.suggest_name}
                                        onChange={(event) => {
                                            this.setState({suggest_name: event.target.value})
                                        }}
                                        onKeyPress={(event) => {
                                            event.target.style.width = ((event.target.value.length + 2) * 14) + 'px';
                                        }}
                                        />
                                    </h3>
                                    <div className="card slim">
                                        <div className=" slim">
                                            {Object.keys(player_backgrounds).map((background) => {
                                                return <div key={background} className=" slim">
                                                    <div className="radio text-center slim">
                                                        <div className="slim">
                                                            <h3 className="text-center">
                                                                <input 
                                                                type="radio" 
                                                                name="background" 
                                                                value={background}
                                                                checked={this.state.selected_background === background}
                                                                onChange={(event) => {
                                                                    this.setState({selected_background: event.target.value})
                                                                }}/>
                                                                {player_backgrounds[background].name}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                        <div>
                                            <p className="text-center slim">{player_backgrounds[this.state.selected_background].text}</p>
                                            <p className="text-center slim"> Start tech: {('technologist' === this.state.selected_background) ? "Agile, Test Drive Development or Refactoring" : technologies[player_backgrounds[this.state.selected_background].start_tech].name} </p>
                                        </div>
                                    </div>
                                    <div className="card slim">
                                        <div className="text-center slim">
                                            <h4 className="text-center filament">Start {selected_background.might}:</h4>
                                            <div className=" slim">
                                                {Object.keys(selected_background.spices).map((spice) => {
                                                    return <div key={spice} className=" slim">
                                                        <div className="radio text-center slim">
                                                            <div className="slim">
                                                                <h3 className="text-center slim-top">
                                                                    <input 
                                                                    type="radio" 
                                                                    name="spice" 
                                                                    value={spice}
                                                                    checked={this.state[this.state.selected_background] === spice}
                                                                    onChange={(event) => {
                                                                        const state = {};
                                                                        state[this.state.selected_background] = event.target.value;
                                                                        this.setState(state);
                                                                    }}/>
                                                                    {selected_background.spices[spice].name}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })}
                                            </div>
                                            <p className="text-center">{selected_background.spices[this.state[this.state.selected_background]].description}</p>
                                        </div>
                                    </div>
                                    <div className="card slim">
                                        <h4 className="text-center slim-top">
                                            <p className="filament">Your start skills:</p>
                                            <StatsBar stats={stats_data} data={data}/>
                                        </h4>
                                    </div>
                                    <div className="text-center">
                                        <button className="big btn-success btn-lg" onClick={this.embark}>Embark</button>
                                    </div>
                                </div>
                                }
                            </SimpleModal>
                        </Portal>
                        : ''}
                </div>
        );
    }
}

export default Creation;