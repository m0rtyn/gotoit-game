import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {colors} from "../game/knowledge";
import Bar from "./Bar";

class WorkerHappinessBar extends Component {

    render() {
        let { worker } = this.props;
        const bar_color = (() => {
            let ratio = worker.getEfficiency() / 100;
            switch (true) {
                case ratio <= 0.5: return colors.danger;
                case ratio <= 0.75: return colors.warning;
                case ratio <= 1: return colors.success;
                case ratio  > 1: return colors.success; // High bonus

            }
        }) ();

        const bar_data = [
            {
                name : 'Happiness',
                width : Math.min(100, worker.getEfficiency()),
                color : bar_color,
                value : `${worker.getEfficiency()}%`,
                showName: true
            },
        ]

        return (
            <div>
                <Bar bar_data={bar_data} />
            </div>
        );
    }
}

WorkerHappinessBar.propTypes = {};

export default WorkerHappinessBar;
