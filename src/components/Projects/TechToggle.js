import React, { Component } from "react";
import * as PropTypes from "prop-types";
import _ from "lodash";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";

export default class TechToggle extends Component {
    static propTypes = {
        tech: PropTypes.object,
        data: PropTypes.object,
        project: PropTypes.object,
        name: PropTypes.string
    };

    changeTech = () => {
        this.props.data.helpers.changeTechnology(this.props.name, this.props.project.id, !this.props.enabled);
    };

    render() {
        let enabled = this.props.enabled;
        return (
            <button onClick={() => this.changeTech()} className="btn btn-tech">
                <img src={this.props.tech.img_sm} className={`worker-avatar ${enabled ? "" : "desaturate"}`} />
            </button>
        );
    }
}
