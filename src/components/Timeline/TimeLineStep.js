import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import DeadLine from "./OverlayTriggers/DeadLine";
import VacationAndLeave from "./OverlayTriggers/VacationAndLeave";
const timelineWidth = window.innerWidth;

export class TimeLineStep extends Component {
    static propTypes = {
        day: PropTypes.any,
        events: PropTypes.arrayOf(PropTypes.any),
        index: PropTypes.number,
        length: PropTypes.number
    };

    render() {
        return (
            <div
                className="step"
                style={{
                    marginLeft: (timelineWidth / (this.props.length - 1)) * this.props.index + "px"
                }}
            >
                <div>{this.props.day.getDate()}</div>

                <div className="worker-portrait">
                    {_.map(this.props.events, (item, index) => {
                        const {
                            type,
                            info,
                            object: { name, avatar }
                        } = item;
                        if (type === "deadline") {
                            return <DeadLine key={`${type}${name}`} index={this.props.index} info={info} name={name} avatar={avatar} />;
                        } else if (type === "vacation" || type === "leave") {
                            return (
                                <VacationAndLeave key={`${type}${name}`} index={this.props.index} info={info} name={name} avatar={avatar} />
                            );
                        } else return null;
                    })}
                </div>
            </div>
        );
    }
}
