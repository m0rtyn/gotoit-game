import React, { PureComponent } from "react";
import * as PropTypes from "prop-types";

export class KickWorkerButton extends PureComponent {
    render() {
        return (
            <span>
                <button className="btn btn-xs team-remove-worker" onClick={this.props.action}>
                    {this.props.name}
                </button>
            </span>
        );
    }
}

KickWorkerButton.propTypes = {
    id: PropTypes.any,
    action: PropTypes.func,
    name: PropTypes.any
};
