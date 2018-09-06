import React, { Component } from "react";
import * as PropTypes from "prop-types";

export default class WorkerCard extends Component {
    static propTypes = {
        f: PropTypes.func,
        workerId: PropTypes.string,
        projectId: PropTypes.string,
        name: PropTypes.string,
        relation: PropTypes.func
    };

    render() {
        return (
            <div key={this.props.workerId + this.props.projectId} className="card filament">
                <div className="" style={{ width: "100%" }}>
                    <input
                        type="checkbox"
                        id={this.props.workerId}
                        checked={this.props.relation(this.props.workerId, this.props.projectId, "meeting")}
                        onChange={this.props.f}
                    />
                    <h4>{this.props.name}</h4>
                </div>
            </div>
        );
    }
}
