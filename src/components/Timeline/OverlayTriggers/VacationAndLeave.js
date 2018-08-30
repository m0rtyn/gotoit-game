import { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import * as PropTypes from "prop-types";
import React from "react";
import { Avatar } from "../../Projects/Avatar";
import _ from "lodash";

export default class VacationAndLeave extends Component {
    static propTypes = {
        avatar: PropTypes.string,
        index: PropTypes.number,
        info: PropTypes.string,
        name: PropTypes.string
    };

    render() {
        return (
            <OverlayTrigger
                delay={150}
                placement="bottom"
                overlay={
                    <Tooltip id={`Tooltip${this.props.index}`}>
                        <div>{this.props.info + ": " + this.props.name}</div>
                    </Tooltip>
                }
            >
                <div className="worker-portrait" role="presentation" style={{ position: "relative" }}>
                    <Avatar style={{ position: "absolute" }} size={20} name={this.props.name} sources={_.toPairs(this.props.avatar)} />
                </div>
            </OverlayTrigger>
        );
    }
}
