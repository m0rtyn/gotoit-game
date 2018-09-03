import React, { Component } from "react";
import * as PropTypes from "prop-types";

export class TasksProgress extends Component {
    render() {
        return (
            <div key={this.props.skill} className="row">
                <div className="col-2">{this.props.skill}</div>
                <div className="col-10 progress">
                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: this.props.tasksPercent + "%" }}>
                        {this.props.tasks ? <span>{this.props.tasks} tasks</span> : ""}
                    </div>
                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: this.props.bugsPercent + "%" }}>
                        {this.props.bugs ? <span>{this.props.bugs} bugs</span> : ""}
                    </div>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: this.props.donePercent + "%" }}>
                        {this.props.done ? <span>{this.props.done} done</span> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

TasksProgress.propTypes = {
    skill: PropTypes.any,
    tasksPercent: PropTypes.number,
    tasks: PropTypes.any,
    bugsPercent: PropTypes.number,
    bugs: PropTypes.any,
    donePercent: PropTypes.number,
    done: PropTypes.any
};
