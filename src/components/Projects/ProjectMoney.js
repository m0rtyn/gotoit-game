import React, { PureComponent } from "react";
import * as PropTypes from "prop-types";

export class ProjectMoney extends PureComponent {
    static propTypes = {
        penalty: PropTypes.number,
        project: PropTypes.any,
        reward: PropTypes.string
    };

    render() {
        let { project, penalty } = this.props;
        return (
            <p className="project-money">
                {project.type === "own" ? (
                    <span className="project-reward text-success">Estimated reward: {project.getEstimatedReward()}$</span>
                ) : (
                    <span className="project-reward text-success">Reward: {project.reward}$</span>
                )}
                {penalty > 0 && <span className="project-penalty"> -{penalty} </span>}
            </p>
        );
    }
}

ProjectMoney.propTypes = {
    reward: PropTypes.any,
    project: PropTypes.any
};
