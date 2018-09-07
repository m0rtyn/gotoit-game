import React, { PureComponent } from "react";
import * as PropTypes from "prop-types";
import { Avatar } from "./Avatar";
import _ from "lodash";

export class WorkerButton extends PureComponent {
    render() {
        return (
            <button className="btn btn-worker" onClick={this.props.action}>
                <Avatar className="worker-avatar" name={this.props.name} sources={_.toPairs(this.props.avatar)} />
                <span
                    className="icon-close"
                    /*onMouseOver={
                        {
                            /!* TODO: make display toggle *!/
                        }
                    }*/
                />
            </button>
        );
    }
}

WorkerButton.propTypes = {
    id: PropTypes.any,
    action: PropTypes.func,
    name: PropTypes.any
};
