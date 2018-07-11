import React, { Component } from 'react';

/***
 * KILL THIS ASAP
 */


class StatsBar extends Component {
    render() {
        const stats = this.props.stats;

        //console.log(stats);

        return (
                <div className="flexbox text-center">
                {Object.keys(stats).map((stat) => {
                    return <span key={stat}>
                        {stats[stat].name}: <span>{stats[stat].val}{'  '}</span>
                    </span>

                })}
                </div>
        );
    }
}

export default StatsBar;
