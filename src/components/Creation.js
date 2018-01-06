import React, { Component } from 'react';
import Portal from 'react-portal';
import _ from 'lodash';

import SimpleModal from './SimpleModal';
import StatsBar from './StatsBar';
import bulkStyler from '../services/bulkStyler';

import WorkerModel from '../models/WorkerModel';
import ProjectModel from '../models/ProjectModel';

import {player_backgrounds, workers_bonus_items, technologies, skills_1} from '../data/knowledge';

export var player = null;

class Creation extends Component {
    constructor(props) {
        super(props);

        let back = _.sample(_.keys(player_backgrounds));
        let tech = _.sample(_.keys(player_backgrounds['technologist'].spices));
        let spec = _.sample(_.keys(player_backgrounds['specialist'].spices));
        let team = _.sample(_.keys(player_backgrounds['coworker'].spices));
        let biz = _.sample(_.keys(player_backgrounds['businessman'].spices));

        this.state = {
            step: 'welcome', // welcome, creation
            suggest_name: WorkerModel.genName(),
            selected_background: back, //'specialist',
            selected_tech: tech, // start_tech_list: ['rad', 'creativity', 'tdd', 'refactoring']
            selected_speciality: spec, //'design',
            selected_team: team, //'partner',
            selected_biz: biz, //'btc',
        };


        this.embark = this.embark.bind(this);
    }

    getPlayerStats() {
        let stats = JSON.parse(JSON.stringify(skills_1));

        stats = bulkStyler.playerBackground(stats, this.state.selected_background);

        if (this.state.selected_background === 'specialist') {
            stats = bulkStyler.playerSpeciality(stats, this.state.selected_speciality);
        }

        return stats;
    }

    embark() {
        console.log('embrk');

        let data = this.props.data;
        data.money += player_backgrounds[this.state.selected_background].money;

        let stats = this.getPlayerStats();

        let tmp_player = WorkerModel.generatePlayer();

        tmp_player.stats = stats;
        tmp_player.name = this.state.suggest_name;

        data.workers[0] = tmp_player; //: [WorkerModel.generatePlayer()]
        player = tmp_player;


        if (this.state.selected_background === 'technologist') {
            data.projects_known_technologies = data.projects_known_technologies.concat(this.state.selected_tech);
        }
        else {
            data.projects_known_technologies = data.projects_known_technologies.concat(player_backgrounds[this.state.selected_background].start_tech);
        }


        switch (this.state.selected_background) {
            case 'specialist':
                player.items[this.state.selected_speciality].exp = true;
                player.items[this.state.selected_speciality].flat = true;
                break;

            case 'coworker':
                switch (this.state.selected_team) {
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
                switch (this.state.selected_biz) {
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

    render() {
        const data = this.props.data;
        const selected_background = player_backgrounds[this.state.selected_background];
        //const worker = data.workers[0];

        let stats = this.getPlayerStats();

        const stats_data = _.mapValues(stats, (val, key) => {
            return {name: key, val: stats[key]};
        });

        return (
                <div>
                    {(data.stage === 'start') ?
                        <Portal ref="creation">
                            <SimpleModal>
                                {this.state.step === 'welcome' ?
                                    <div>
                                        <h3 className="text-center">Go To IT</h3>
                                        <h4 className="text-center">Game About Software Development</h4>
                                        <div className="panel panel-info">
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
                                    Choose <input type="text" name="background" className="form-inline"
                                                  value={this.state.suggest_name}
                                                  onChange={(event) => {
                                                      this.setState({suggest_name: event.target.value})
                                                  }}
                                                  onKeyPress={(event) => {
                                                      event.target.style.width = ((event.target.value.length + 2) * 14) + 'px';
                                                  }}
                                /> Background
                                </h3>
                                <div className="panel panel-info">
                                    <div className="flex-container-row">
                                        {Object.keys(player_backgrounds).map((background) => {
                                            return <div key={background} className="flex-element slim">
                                                <div className="radio text-center slim">
                                                    <label className="slim">
                                                        <h3 className="text-center">
                                                            <input type="radio" name="background" value={background}
                                                                   checked={this.state.selected_background === background}
                                                                   onChange={(event) => {
                                                                       this.setState({selected_background: event.target.value})
                                                                   }}/>
                                                            {player_backgrounds[background].name}
                                                        </h3>
                                                    </label>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                    <div>
                                        <p className="text-center slim">{player_backgrounds[this.state.selected_background].text}</p>
                                        <p className="text-center slim"> Start tech: {('technologist' === this.state.selected_background) ? "rad, creativity, tdd or refactoring" : technologies[player_backgrounds[this.state.selected_background].start_tech].name} </p>
                                    </div>
                                </div>
                                <div className="panel panel-success">
                                        {(() => {
                                            switch (this.state.selected_background) {
                                                case "technologist":   return <div><div className="flex-container-row">
                                                    {Object.keys(selected_background.spices).map((tech) => {
                                                        return <div key={tech} className="flex-element">
                                                            <div className="radio text-center">
                                                                <label className="slim">
                                                                    <h3 className="text-center">
                                                                        <input type="radio" name="tech" value={tech}
                                                                               checked={this.state.selected_tech === tech}
                                                                               onChange={(event) => {
                                                                                   this.setState({selected_tech: event.target.value});
                                                                               }}/>
                                                                        {selected_background.spices[tech].name}
                                                                    </h3>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    })}
                                                    </div>
                                                        <p className="text-center">{technologies[this.state.selected_tech].description}</p>
                                                    </div>;
                                                case "specialist":   return <div><div className="flex-container-row">
                                                    {Object.keys(selected_background.spices).map((speciality) => {
                                                        return <div key={speciality} className="flex-element">
                                                            <div className="radio text-center">
                                                                <label className="slim">
                                                                    <h3 className="text-center">
                                                                        <input type="radio" name="speciality" value={speciality}
                                                                               checked={this.state.selected_speciality === speciality}
                                                                               onChange={(event) => {
                                                                                   this.setState({selected_speciality: event.target.value});
                                                                               }}/>
                                                                        {selected_background.spices[speciality].name}
                                                                    </h3>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    })}
                                                    </div>
                                                        <p className="text-center">Start items: {workers_bonus_items[this.state.selected_speciality].exp.name} and {workers_bonus_items[this.state.selected_speciality].flat.name}</p>
                                                    </div>;
                                                case "coworker": return <div><div className="flex-container-row">
                                                    {Object.keys(selected_background.spices).map((team) => {
                                                        return <div key={team} className="flex-element">
                                                            <div className="radio text-center">
                                                                <label className="slim">
                                                                    <h3 className="text-center">
                                                                        <input type="radio" name="team" value={team}
                                                                               checked={this.state.selected_team === team}
                                                                               onChange={(event) => {
                                                                                   this.setState({selected_team: event.target.value});
                                                                               }}/>
                                                                        {selected_background.spices[team].name}
                                                                    </h3>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    })}
                                                </div>
                                                    <p className="text-center">{selected_background.spices[this.state.selected_team].description}</p>
                                                </div>;
                                                case "businessman": return <div><div className="flex-container-row">
                                                    {Object.keys(selected_background.spices).map((biz) => {
                                                        return <div key={biz} className="flex-element">
                                                            <div className="radio text-center">
                                                                <label className="slim">
                                                                    <h3 className="text-center">
                                                                        <input type="radio" name="biz" value={biz}
                                                                               checked={this.state.selected_biz === biz}
                                                                               onChange={(event) => {
                                                                                   this.setState({selected_biz: event.target.value});
                                                                               }}/>
                                                                        {selected_background.spices[biz].name}
                                                                    </h3>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    })}
                                                </div>
                                                    <p className="text-center">{selected_background.spices[this.state.selected_biz].description}</p>
                                                </div>;
                                                case "businessman-old":  return <p className="panel">The credit account of a businessman is too good to be wasted. Just use these opportunities to hire and train workers from the very beginning.</p>;
                                                default:      return "OOPSSS!";
                                            }
                                        })()}
                                </div>
                                <div className="panel panel-warning">
                                    <h4 className="text-center fat">
                                        <p className="fat">Your start skills:</p>
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