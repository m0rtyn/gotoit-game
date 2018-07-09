import React, { Component } from 'react';

/***
 * KILL THIS ASAP
 */


class StatsBar extends Component {
    render() {
        const stats = this.props.stats;

        //console.log(stats);

        return (
                <div className="stats-bar">
                {Object.keys(stats).map((stat) => {
                    return <div className='' key={stat}>
                        {stats[stat].name}: <span>{stats[stat].val}</span>
                    </div>
                })}
                </div>
        );
    }
}

export default StatsBar;
