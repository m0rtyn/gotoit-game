import React, { Component } from "react";

import Header from "./Header";
import People from "./People";
// import Timeline from './Timeline'
import Projects from "./Projects/Projects";
import PopupsNest from "./PopupsNest";
import ToastNest from "./ToastNest";

import ActivityToolbar from "./ActivityToolbar.js";
import Activities from "./Activities.js";

import { colors } from "../game/knowledge/colors";
import _ from "lodash";
import { male_avatar } from "../game/knowledge/worker_avatar";

const backgrounds = require.context("../assets/images/backgrounds/", true, /^\.\/.*\.png$/);

class Layout extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div
                    className="background-color"
                    style={{
                        backgroundColor: colors.backgrounds[this.props.data.content]
                    }}
                />{" "}
                <div
                    className="background-image"
                    style={{
                        backgroundImage: `url(${backgrounds(`./${this.props.data.content}.png`)})`
                    }}
                />
                <Header data={this.props.data} newGame={this.props.newGame} />
                <div className="main-container">
                    <div className="row gap-2">
                        <div className="col-3 people-column">
                            <People data={this.props.data} />
                        </div>
                        <div className="col-6 activity-column card">
                            <div className="card-body">
                                <ActivityToolbar data={this.props.data} />
                                <Activities data={this.props.data} />
                            </div>
                        </div>
                        <div className="col-3 projects-column">
                            <Projects data={this.props.data} />
                        </div>
                    </div>
                </div>
                <PopupsNest data={this.props.data} />
                <ToastNest data={this.props.data} />
            </div>
        );
    }
}

export default Layout;
