import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { colors } from "../game/knowledge/colors";
import Bar from "./Bar/Bar";

class WorkerStaminaBar extends Component {
    render() {
        let { worker } = this.props;
        const bar_data = [
            {
                name: "Stamina",
                width: Math.min(100, worker.stamina / 50),
                color: "#F26191",
                value: `${Math.floor(worker.stamina / 50)}%`,
                showName: true
            },
            {
                name: "empty",
                width: 100 - Math.min(100, worker.stamina / 50),
                color: "#993D5C",
                value: "",
                showName: false
            }
        ];

        return <Bar className="stamina-bar" bar_data={bar_data} />;
    }
}

WorkerStaminaBar.propTypes = {};

export default WorkerStaminaBar;
