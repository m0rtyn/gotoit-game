import React, { Component } from "react";
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
import backgroundImg from "../assets/images/creation/backgrounds/specialist.png";
import bonusImg from "../assets/images/creation/bonuses/cash.png";
import { DefaultClickSoundButton, sounds } from "../game/knowledge/sounds";

export var player = null;

class Creation extends Component {
    constructor(props) {
        super(props);

        let back = _.sample(_.keys(player_backgrounds));

        let gender = ["male", "female", "other"][_.random(0, 1)];

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

        data.helpers.pushNewProject();
        data.helpers.pushNewProject();
        data.helpers.pushNewProject();

        data.stage = "game";

        this.props.data.helpers.playGame();
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
                    <h4 className="fw-700">Test</h4>
                    <div className="customizator-controls">
                        <DefaultClickSoundButton className="control-arrow" onClick={() => this.fragmentDec(key)}>
                            {"<"}
                        </DefaultClickSoundButton>

                        <h5 className="text-center">{asset[key][this.state.avatar[key]].name}</h5>

                        <DefaultClickSoundButton className="control-arrow" onClick={() => this.fragmentInc(key)}>
                            {">"}
                        </DefaultClickSoundButton>
                    </div>
                </div>
            );
        });
        return (
            <>
                {data.stage === "start" ? (
                    <Modal className="creation">
                        {this.state.step === "welcome" ? (
                            <div className="modal-content welcome">
                                <div className="modal-body">
                                    <img className="logo" src={logo} />
                                    <div>
                                        <h4 className="lead fw-500 mb-32">
                                            <p>This game is about software development and the rise of your company to the heights.</p>
                                            <p>
                                                Start with small contracts, save up some money, hire a couple of assistants and try to
                                                create something really cool!
                                            </p>
                                        </h4>
                                        <h6 className="warning text-center">
                                            The game on the early stages of development, bugs are possible! Developers will be grateful if
                                            in case of any problem you write to the Support.
                                        </h6>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <DefaultClickSoundButton
                                        className="btn btn-success btn-lg ml-auto fw-700"
                                        onClick={() => {
                                            this.setState({ step: "appearance" });
                                        }}
                                    >
                                        Create Your Company!
                                    </DefaultClickSoundButton>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {this.state.step === "appearance" ? (
                            <div className="modal-content appearance">
                                <div className="modal-header">
                                    <h2 className="modal-title text-center fw-300">Create your character</h2>
                                </div>
                                <div className="modal-body">
                                    <div className="inputs mr-48">
                                        <h4 className="fw-500">Name</h4>
                                        <input
                                            type="text"
                                            name="background"
                                            className="form-control player-name"
                                            value={this.state.suggest_name}
                                            onChange={event => {
                                                this.setState({
                                                    suggest_name: event.target.value
                                                });
                                            }}
                                        />
                                        <div className="gender-select mb-32">
                                            <h4 className="fw-500 mt-24">Gender</h4>
                                            <DefaultClickSoundButton
                                                className="btn btn-sm btn-primary flex-grow"
                                                value="male"
                                                onChange={this.handleGenderChange}
                                                onClick={() => {
                                                    this.setState({ gender: "male" });
                                                }}
                                            >
                                                <span className="icon-gender-men text-white" />
                                                 Male
                                            </DefaultClickSoundButton>
                                            <DefaultClickSoundButton
                                                className="btn btn-sm btn-primary flex-grow"
                                                value="female"
                                                onChange={this.handleGenderChange}
                                                onClick={() => {
                                                    this.setState({ gender: "female" });
                                                }}
                                            >
                                                <span className="icon-gender-women text-white" />
                                                 Female
                                            </DefaultClickSoundButton>
                                            <DefaultClickSoundButton
                                                className="btn btn-sm btn-primary flex-grow"
                                                value="other"
                                                onChange={this.handleGenderChange}
                                                onClick={() => {
                                                    this.setState({ gender: "other" });
                                                }}
                                            >
                                                <span className="icon-gender-other text-white" />
                                                 Other
                                            </DefaultClickSoundButton>
                                        </div>
                                        <div className="customizator">{selectors}</div>
                                    </div>
                                    <div className="portrait">
                                        <Avatar
                                            className="player-avatar worker-avatar"
                                            name={"player avatar"}
                                            sources={_.toPairs(this.state.realAvatar)}
                                        />
                                        <DefaultClickSoundButton className="btn btn-lg btn-primary" onClick={this.randomize}>
                                            Randomise
                                        </DefaultClickSoundButton>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <div className="partition-switch">
                                        <DefaultClickSoundButton
                                            className={`btn-dot ${this.state.step === "appearance" ? "active" : ""}`}
                                            onClick={() => {
                                                this.setState({ step: "appearance" });
                                            }}
                                        />
                                        <DefaultClickSoundButton
                                            className={`btn-dot ${this.state.step === "background" ? "active" : ""}`}
                                            onClick={() => {
                                                this.setState({ step: "background" });
                                            }}
                                        />
                                    </div>
                                    <DefaultClickSoundButton
                                        className="btn btn-lg btn-success btn-w-lg next-partition"
                                        onClick={() => {
                                            this.setState({ step: "background" });
                                        }}
                                    >
                                        Next
                                    </DefaultClickSoundButton>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {this.state.step === "background" ? (
                            <div className="modal-content background">
                                <div className="modal-header">
                                    <h2 className="modal-title text-center fw-300">Choose background</h2>
                                </div>
                                <div className="modal-body">
                                    <div className="background-select pb-16 bb-1 border-secondary">
                                        {Object.keys(player_backgrounds).map(background => {
                                            return (
                                                <div key={background}>
                                                    <input
                                                        className=""
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
                                                    <label className="btn-background" htmlFor={background + "-radio-button"}>
                                                        <img className="background-img" src={backgroundImg} />
                                                        <h4 className="fw-700 mt-8">{player_backgrounds[background].name}</h4>
                                                    </label>
                                                </div>
                                            );
                                        })}
                                        <h5 className="background-description text-center">
                                            {player_backgrounds[this.state.selected_background].text}
                                            <br />
                                            <br />
                                            {player_backgrounds[this.state.selected_background].start_tech.length > 0 ? (
                                                <span>
                                                    Start tech:{" "}
                                                    {technologies[player_backgrounds[this.state.selected_background].start_tech].name}
                                                </span>
                                            ) : (
                                                ""
                                            )}{" "}
                                            Start {selected_background.might}:
                                            {selected_background.spices[this.state[this.state.selected_background]].description}{" "}
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
                                        </h5>
                                    </div>

                                    <StatsBar stats={stats_data} data={data} />

                                    <div className="bonus-select pt-16 bt-1 border-secondary">
                                        <h3 className="text-center modal-title">Start bonus</h3>
                                        {Object.keys(selected_background.spices).map(spice => {
                                            return (
                                                <div key={spice}>
                                                    <input
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
                                                    <label className="btn-background" htmlFor={spice + "-radio-button"}>
                                                        <img className="bonus-img mb-8" src={bonusImg} />
                                                        <h5 className="fw-700">{selected_background.spices[spice].name}</h5>
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="partition-switch">
                                        <DefaultClickSoundButton
                                            className={`btn-dot ${this.state.step === "appearance" ? "active" : ""}`}
                                            onClick={() => {
                                                this.setState({ step: "appearance" });
                                            }}
                                        />
                                        <DefaultClickSoundButton
                                            className={`btn-dot ${this.state.step === "background" ? "active" : ""}`}
                                            onClick={() => {
                                                this.setState({ step: "background" });
                                            }}
                                        />
                                    </div>
                                    <DefaultClickSoundButton className="btn btn-success btn-lg btn-w-lg embark" onClick={this.embark}>
                                        Embark
                                    </DefaultClickSoundButton>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </Modal>
                ) : (
                    ""
                )}
            </>
        );
    }
}

export default Creation;
