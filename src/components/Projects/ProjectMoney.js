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
            <p className="project-money">
                <span className="project-reward text-success">Estimated reward: {reward}$</span>
                {penalty > 0 && <span className="project-penalty"> -{penalty} </span>}
            </p>
        );
    }
}

ProjectMoney.propTypes = {
    reward: PropTypes.any,
    project: PropTypes.any
};
