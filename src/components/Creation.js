import React, { Component } from "react";
import Portal from "react-portal";
import _ from "lodash";

import Modal from "./Modal/Modal";
import StatsBar from "./StatsBar";
import bulkStyler from "../services/bulkStyler";

import WorkerModel from "../models/WorkerModel";
import ProjectModel from "../models/ProjectModel";

import { skills_1 } from "../game/knowledge/skills";
import { technologies } from "../game/knowledge/technologies";
import { player_backgrounds } from "../game/knowledge/player_backgrounds";
import { Avatar } from "./Projects/Avatar";
import { generateFemaleAvatar, generateMaleAvatar, customizeAvatar, male_asset, female_asset } from "../game/knowledge/worker_avatar";
import logo from "../assets/images/go2it-logo.png";

export var player = null;

class Creation extends Component {
    constructor(props) {
        super(props);

        let back = _.sample(_.keys(player_backgrounds));

        let gender = ["male", "female"][_.random(0, 1)];

        let avatar = null;
        if (gender === "male") {
            avatar = {
                body: _.random(0, male_asset.body.length - 1),
                eyes: _.random(0, male_asset.eyes.length - 1),
                eyebrows: _.random(0, male_asset.eyebrows.length - 1),
                nose: _.random(0, male_asset.nose.length - 1),
                mouth: _.random(0, male_asset.mouth.length - 1),
                beard: _.random(0, male_asset.beard.length - 1),
                accessories: _.random(0, male_asset.accessories.length - 1),
                hair: _.random(0, male_asset.hair.length - 1),
                clothes: _.random(0, male_asset.clothes.length - 1)
            };
        } else {
            avatar = {
                body: _.random(0, female_asset.body.length - 1),
                eyes: _.random(0, female_asset.eyes.length - 1),
                eyebrows: _.random(0, female_asset.eyebrows.length - 1),
                nose: _.random(0, female_asset.nose.length - 1),
                mouth: _.random(0, female_asset.mouth.length - 1),
                beard: null,
                accessories: _.random(0, female_asset.accessories.length - 1),
                hair: _.random(0, female_asset.hair.length - 1),
                clothes: _.random(0, female_asset.clothes.length - 1)
            };
        }
        let realAvatar = (() => {
            let { body, eyes, eyebrows, nose, mouth, beard, accessories, hair, clothes } = avatar;
            return customizeAvatar(gender, body, eyes, eyebrows, nose, mouth, beard, accessories, hair, clothes);
        })();

        this.state = {
            step: "welcome", // welcome, creation
            gender: gender,
            suggest_name: WorkerModel.genName(gender),
            selected_background: back, //'specialist',
            specialist: _.sample(_.keys(player_backgrounds["specialist"].spices)),
            coworker: _.sample(_.keys(player_backgrounds["coworker"].spices)),
            businessman: _.sample(_.keys(player_backgrounds["businessman"].spices)),
            avatar: avatar,
            realAvatar: realAvatar,
            asset: gender === "male" ? male_asset : female_asset
        };

        this.embark = this.embark.bind(this);
    }

    // shouldComponentUpdate() {
    //   return false;
    // }
    genAvatar = () => {
        let gender = this.state.gender;
        let { body, eyes, eyebrows, nose, mouth, beard, accessories, hair, clothes } = this.state.avatar;
        this.setState({ realAvatar: customizeAvatar(gender, body, eyes, eyebrows, nose, mouth, beard, accessories, hair, clothes) });
    };
    getPlayerStats() {
        let stats = JSON.parse(JSON.stringify(skills_1));

        stats = bulkStyler.playerBackground(stats, this.state.selected_background);

        if (this.state.selected_background === "specialist") {
            stats = bulkStyler.playerSpeciality(stats, this.state.specialist);
        }

        if (this.state.selected_background === "businessman" && this.state.businessman === "manager") {
            stats.manage += 4;
        }

        return stats;
    }

    embark() {
        console.log("embrk");

        let data = this.props.data;
        data.money += player_backgrounds[this.state.selected_background].money;

        let stats = this.getPlayerStats();

        console.log(stats);

        let tmp_player = WorkerModel.generatePlayer(this.state.gender);
        tmp_player.setAvatar(this.state.realAvatar);

        tmp_player.stats = stats;
        tmp_player.name = this.state.suggest_name;

        data.workers[0] = tmp_player; //: [WorkerModel.generatePlayer()]
        player = tmp_player;

        data.projects_known_technologies = data.projects_known_technologies.concat(
            player_backgrounds[this.state.selected_background].start_tech,
            player_backgrounds[this.state.selected_background].spices[this.state[this.state.selected_background]].start_tech
        );

        switch (this.state.selected_background) {
            case "specialist":
                console.log(player.items, this.state.specialist);
                player.items[this.state.specialist].exp = true;
                player.items[this.state.specialist].flat = true;
                break;

            case "coworker":
                data.helpers.hireEmployer(WorkerModel.generate(1));
                switch (this.state.coworker) {
                    case "pair":
                        break;
                    case "helper":
                        data.helpers.hireEmployer(WorkerModel.generate(1));
                        break;
                    case "motivation":
                        break;
                    default:
                        console.log("Wrong team?");
                }
                //   data.helpers.hireEmployer(WorkerModel.generate(8));
                data.helpers.changeOffice(2); // data.office = new OfficeModel(2);
                break;

            case "businessman":
                data.early_payed_loans += 9200;
                switch (this.state.businessman) {
                    case "cash":
                        data.money += 10000;
                        break;
                    case "micromanagement":
                        break;
                    case "manager":
                        break;
                    default:
                        console.log("Wrong biz?");
                }
                break;

            default:
                console.log("Wrong background?");
        }

        // i must hard set :(
        data.helpers.brutalSet({ data: data });

        data.helpers.offerProject(ProjectModel.generate(1, 1, "player"));
        data.helpers.offerProject(ProjectModel.generate(2, 1, "player"));
        data.helpers.offerProject(ProjectModel.generate(3, 1, "player"));

        data.stage = "game";
        this.refs.creation.closePortal();

        this.props.data.helpers.playGame();
    }

    componentDidMount() {
        this.refs.creation.openPortal();
    }
    generateAvatar = gender => {
        let avatar;
        if (gender === "male") {
            avatar = {
                body: _.random(0, male_asset.body.length - 1),
                eyes: _.random(0, male_asset.eyes.length - 1),
                eyebrows: _.random(0, male_asset.eyebrows.length - 1),
                nose: _.random(0, male_asset.nose.length - 1),
                mouth: _.random(0, male_asset.mouth.length - 1),
                beard: _.random(0, male_asset.beard.length - 1),
                accessories: _.random(0, male_asset.accessories.length - 1),
                hair: _.random(0, male_asset.hair.length - 1),
                clothes: _.random(0, male_asset.clothes.length - 1)
            };
        } else {
            avatar = {
                body: _.random(0, female_asset.body.length - 1),
                eyes: _.random(0, female_asset.eyes.length - 1),
                eyebrows: _.random(0, female_asset.eyebrows.length - 1),
                nose: _.random(0, female_asset.nose.length - 1),
                mouth: _.random(0, female_asset.mouth.length - 1),
                beard: null,
                accessories: _.random(0, female_asset.accessories.length - 1),
                hair: _.random(0, female_asset.hair.length - 1),
                clothes: _.random(0, female_asset.clothes.length - 1)
            };
        }
        return avatar;
    };
    generateRealAvatar = (avatar, gender) => {
        let { body, eyes, eyebrows, nose, mouth, beard, accessories, hair, clothes } = avatar;
        let newRealAvatar = customizeAvatar(gender, body, eyes, eyebrows, nose, mouth, beard, accessories, hair, clothes);
        this.setState({
            gender: gender,
            avatar: avatar,
            realAvatar: newRealAvatar
        });
    };
    handleGenderChange = changeEvent => {
        let newGender = changeEvent.target.value; //randomize
        this.setState({ suggest_name: WorkerModel.genName(newGender) });
        this.generateRealAvatar(this.generateAvatar(newGender), newGender);
    };
    randomize = () => {
        this.generateRealAvatar(this.generateAvatar(this.state.gender), this.state.gender);
    };
    fragmentDec = fragment => {
        let state = this.state;
        let fragmentLength = state.gender === "male" ? male_asset[fragment].length - 1 : female_asset[fragment].length - 1;

        if (state.avatar[fragment] !== 0) {
            state.avatar[fragment]--;
        } else {
            state.avatar[fragment] = fragmentLength;
        }
        this.generateRealAvatar(state.avatar, state.gender);
    };
    fragmentInc = fragment => {
        let state = this.state;
        let fragmentLength = state.gender === "male" ? male_asset[fragment].length - 1 : female_asset[fragment].length - 1;
        if (state.avatar[fragment] !== fragmentLength) {
            state.avatar[fragment]++;
        } else {
            state.avatar[fragment] = 0;
        }
        this.generateRealAvatar(state.avatar, state.gender);
    };
    /*handleAvatarInc(type, value){

    }
*/
    render() {
        const data = this.props.data;
        const selected_background = player_backgrounds[this.state.selected_background];
        //const worker = data.workers[0];

        let stats = this.getPlayerStats();

        const stats_data = _.mapValues(stats, (val, key) => {
            return { name: key, val: stats[key] };
        });

        let asset = this.state.gender === "male" ? male_asset : female_asset;
        let keys = _.keys(asset);
        //SELECTORS FOR THE CONSTRUCTOR
        let selectors = _.map(keys, key => {
            return (
                <div className="customizator-item" key={key}>
                    {/* <h4></h4> */}
                    <button onClick={() => this.fragmentDec(key)}>{"<"}</button>
                    <span>{asset[key][this.state.avatar[key]].name}</span>
                    <button onClick={() => this.fragmentInc(key)}>{">"}</button>
                </div>
            );
        });
        return (
            <div>
                {data.stage === "start" ? (
                    <Portal ref="creation">
                        <Modal>
                            {this.state.step === "welcome" ? (
                                <div className="modal-content creation welcome">
                                    <div className="modal-body">
                                        <img className="logo" src={logo} />
                                        <h4 className="lead">
                                            <p>This game is about software development and the rise of your company to the heights.</p>
                                            <p>
                                                Start with small contracts, save up some money, hire a couple of assistants and try to
                                                create something really cool!
                                            </p>
                                            <p className="warning text-center">The game is in open beta</p>
                                        </h4>
                                    </div>
                                    <div className="modal-footer mx-auto">
                                        <button
                                            className="btn btn-success btn-lg btn-"
                                            onClick={() => {
                                                this.setState({ step: "appearance" });
                                            }}
                                        >
                                            Create Your Company!
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}

                            {this.state.step === "appearance" ? (
                                <div className="modal-content creation appearance">
                                    <div className="modal-header">
                                        <p className="modal-title text-center">Create your character</p>
                                    </div>
                                    <div className="modal-body">
                                        {/* <section className="card creation-person"> */}
                                        <div className="inputs">
                                            <h3 className="modal-title">Your name</h3>
                                            <div>
                                                <div className="input-group creation-player-name ">
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
                                            <div className="creation-gender-select">
                                                <h3 className="modal-title mt-16">Choose gender</h3>
                                                <input
                                                    className="form-check-input"
                                                    id="male-gender-radio-button"
                                                    type="radio"
                                                    value="male"
                                                    checked={this.state.gender === "male"}
                                                    onChange={this.handleGenderChange}
                                                />
                                                <label className="form-check-label btn btn-sm" htmlFor="male-gender-radio-button">
                                                    <span className="icon-gender-men" />
                                                    Male
                                                </label>
                                                <input
                                                    className="form-check-input"
                                                    id="female-gender-radio-button"
                                                    type="radio"
                                                    value="female"
                                                    checked={this.state.gender === "female"}
                                                    onChange={this.handleGenderChange}
                                                />
                                                <label className="form-check-label btn btn-sm" htmlFor="female-gender-radio-button">
                                                    <span className="icon-gender-women" />
                                                    Female
                                                </label>
                                                {/* <input
                                                    className="form-check-input"
                                                    id="female-gender-radio-button"
                                                    type="radio"
                                                    value="other"
                                                    checked={this.state.gender === "other"}
                                                    onChange={this.handleGenderChange}
                                                /> */}
                                                {/* <label
                                                    className="form-check-label btn btn-sm btn-primary"
                                                    htmlFor="female-gender-radio-button"
                                                >
                                                    <span className="icon-gender-other" />
                                                    Other
                                                </label> */}
                                            </div>
                                            <h3 className="modal-title mt-16">Customization</h3>
                                            <div className="customizator">{selectors}</div>
                                        </div>
                                        <div className="portrait">
                                            <Avatar
                                                className="player-avatar worker-avatar"
                                                name={"player avatar"}
                                                // style={{ position: 'absolute'}}
                                                sources={_.toPairs(this.state.realAvatar)}
                                            />
                                            <button className="btn btn-primary" onClick={this.randomize}>
                                                Randomize
                                            </button>
                                        </div>
                                        {/* </section> */}
                                    </div>

                                    <div className="modal-footer ml-auto">
                                        <button
                                            className="btn btn-lg btn-success"
                                            onClick={() => {
                                                this.setState({ step: "background" });
                                            }}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                            {this.state.step === "background" ? (
                                <div className="modal-content creation background">
                                    <div className="modal-body">
                                        <section className="card creation-background">
                                            <div className="card-body">
                                                <div className="creation-background-select">
                                                    <div className="creation-select-column">
                                                        {Object.keys(player_backgrounds).map(background => {
                                                            return (
                                                                <div key={background}>
                                                                    <input
                                                                        className="form-check-input"
                                                                        id={background + "-radio-button"}
                                                                        type="radio"
                                                                        name="background"
                                                                        value={background}
                                                                        checked={this.state.selected_background === background}
                                                                        onChange={event => {
                                                                            this.setState({
                                                                                selected_background: event.target.value
                                                                            });
                                                                        }}
                                                                    />
                                                                    <label
                                                                        className="form-check-label btn btn-sm"
                                                                        htmlFor={background + "-radio-button"}
                                                                    >
                                                                        {player_backgrounds[background].name}
                                                                    </label>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="creation-description-column">
                                                        <h3 className="text-center modal-title">Choose background</h3>

                                                        <div className="creation-description lead text-center">
                                                            {player_backgrounds[this.state.selected_background].text}
                                                            <br />
                                                            {player_backgrounds[this.state.selected_background].start_tech.length > 0 ? (
                                                                <span>
                                                                    Start tech:{" "}
                                                                    {
                                                                        technologies[
                                                                            player_backgrounds[this.state.selected_background].start_tech
                                                                        ].name
                                                                    }
                                                                </span>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <section className="card creation-technology">
                                            <div className="card-body">
                                                <div className="creation-might-select">
                                                    <div className="creation-select-column">
                                                        {Object.keys(selected_background.spices).map(spice => {
                                                            return (
                                                                <div key={spice} className="">
                                                                    <input
                                                                        className="form-check-input"
                                                                        id={spice + "-radio-button"}
                                                                        type="radio"
                                                                        name="spice"
                                                                        value={spice}
                                                                        checked={this.state[this.state.selected_background] === spice}
                                                                        onChange={event => {
                                                                            const state = {};
                                                                            state[this.state.selected_background] = event.target.value;
                                                                            this.setState(state);
                                                                        }}
                                                                    />
                                                                    <label
                                                                        className="form-check-label btn btn-sm"
                                                                        htmlFor={spice + "-radio-button"}
                                                                    >
                                                                        {selected_background.spices[spice].name}
                                                                    </label>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="creation-description-column">
                                                        <h3 className="text-center modal-title">Start {selected_background.might}:</h3>
                                                        <div className="creation-description lead text-center">
                                                            {
                                                                selected_background.spices[this.state[this.state.selected_background]]
                                                                    .description
                                                            }
                                                            <br />
                                                            {player_backgrounds[this.state.selected_background].spices[
                                                                this.state[this.state.selected_background]
                                                            ].start_tech.length > 0 ? (
                                                                <span>
                                                                    Start tech:{" "}
                                                                    {
                                                                        technologies[
                                                                            player_backgrounds[this.state.selected_background].spices[
                                                                                this.state[this.state.selected_background]
                                                                            ].start_tech
                                                                        ].name
                                                                    }
                                                                </span>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <section className="card creation-skills">
                                            <div className="card-body">
                                                <div className="creation-start-skills">
                                                    <h3 className="text-center modal-title">Your start skills:</h3>
                                                    <StatsBar stats={stats_data} data={data} />

                                                    {/* <StatsProgressBar type={'design'} hideCheckbox={true} max_stat={data.max_stats_projects_offered} stats={stats_progressbar_data} worker={candidate} data={data}/>
                                                    <StatsProgressBar type={'program'} hideCheckbox={true} max_stat={data.max_stats_projects_offered} stats={stats_progressbar_data} worker={candidate} data={data}/>
                                                    <StatsProgressBar type={'manage'} hideCheckbox={true} max_stat={data.max_stats_projects_offered} stats={stats_progressbar_data} worker={candidate} data={data}/> */}
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                    <div className="modal-footer ml-auto">
                                        <button className="btn btn-success btn-lg btn-" onClick={this.embark}>
                                            Embark
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                        </Modal>
                    </Portal>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default Creation;
