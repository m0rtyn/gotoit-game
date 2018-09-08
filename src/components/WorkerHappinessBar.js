import React, { Component } from "react";
import Bar from "./Bar/Bar";

class WorkerHappinessBar extends Component {
    render() {
        let { worker } = this.props;
        const happiness_real = worker.calcEfficiencyReal();
        const bar_data = [
            {
                name: "Happiness",
                width: happiness_real,
                color: "#81CC52",
                value: happiness_real + "%",
                showName: true
            },
            {
                name: "empty",
                width: 100 - happiness_real,
                color: "#61993D",
                value: "",
                showName: false
            }
        ];

        return <Bar className="happiness-bar" bar_data={bar_data} />;
    }
}

WorkerHappinessBar.propTypes = {};

export default WorkerHappinessBar;
