import React, { PureComponent } from "react";
import * as PropTypes from "prop-types";

export class RejectButton extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func
    };
    render() {
        return (
            <button className="btn btn-sm btn-danger" onClick={this.props.onClick}>
                Reject
            </button>
        );
    }
}
