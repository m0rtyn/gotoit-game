import React, { PureComponent } from "react";
import * as PropTypes from "prop-types";

export class ProjectMoney extends PureComponent {
    static propTypes = {
        penalty: PropTypes.number,
        project: PropTypes.any,
        reward: PropTypes.string
    };

    render() {
        let { reward, penalty } = this.props;
        return (
            <div>
                <span className="project-reward text-success">Reward: {reward}$</span>
                {penalty > 0 && <span className="project-penalty text-warning"> Penalty : {penalty}$ </span>}
            </div>
        );
    }
}

ProjectMoney.propTypes = {
    reward: PropTypes.any,
    project: PropTypes.any
};
