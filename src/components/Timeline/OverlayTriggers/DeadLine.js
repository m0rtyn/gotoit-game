import { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import React from "react";
import * as PropTypes from "prop-types";
import { Avatar } from "../../Projects/Avatar";
import _ from "lodash";
import ReactTooltip from "react-tooltip";

export default class DeadLine extends Component {
    static propTypes = {
        avatar: PropTypes.shape(),
        index: PropTypes.number,
        info: PropTypes.string,
        name: PropTypes.string
    };

    render() {
        return (
            <div>
                <a data-tip>
                    <div style={{ position: "relative" }}>
                        <Avatar name={this.props.name} sources={_.toPairs(this.props.avatar)} style={{ position: "absolute" }} size={20} />
                    </div>
                </a>
                <ReactTooltip place="bottom">
                    <div>{this.props.info + ": " + this.props.name}</div>
                </ReactTooltip>
            </div>
        );
    }
}
