import React, {Component} from 'react';
import Bar from './Bar'
import PropTypes from 'prop-types';
import _ from "lodash";
import {roles, skills_names} from "../game/knowledge";

class StatsProgressBar extends Component {
    constructor(props){
        super(props);

        this.changeRole = this.changeRole.bind(this);
    }
    changeRole(event){
        this.props.data.helpers.changeRole(this.props.worker.id, event.target.id, event.target.checked);
    }
    render() {
        const stats = this.props.stats;
        const data = this.props.data;
        const worker = this.props.worker;
        const type = this.props.type;
        let bar_data = {};
        let stat = 'default';
        switch(type){
            case 'design':
                stat = 'design';
                bar_data = {
                    name: stat,
                    value: parseInt(stats[stat].value),
                    width: (parseInt(stats[stat].value) / data.max_stat) * 100,
                    color: stats[stat].color,
                    showName: true
                };
                break;
            case 'program':
                stat = 'program';
                bar_data = {
                    name: stat,
                    value: parseInt(stats[stat].value),
                    width: (parseInt(stats[stat].value) / data.max_stat) * 100,
                    color: stats[stat].color,
                    showName: true
                };
                break;
            case 'manage':
                stat = 'manage';
                bar_data = {
                    name: stat,
                    value: parseInt(stats[stat].value),
                    width: (parseInt(stats[stat].value) / data.max_stat) * 100,
                    color: stats[stat].color,
                    showName: true
                };
                break;
        }

        return (
            <div className="stats-progress-bar">
                <input
                type="checkbox"
                id={stat}
                checked={this.props.data.helpers.getRole(worker.id, stat)}
                onChange={this.changeRole}
                />
                <Bar bar_data={[bar_data]} />
            </div>
        );
    }
}

StatsProgressBar.propTypes = {};

export default StatsProgressBar;
