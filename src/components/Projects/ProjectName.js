import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import { project_sizes } from "../../game/knowledge/projects";

class ProjectName extends PureComponent {
    static defaultProps = {
        size: 0
    };

    static propTypes = {
        deadlineText: PropTypes.string,
        kind: PropTypes.string,
        name: PropTypes.string,
        penalty: PropTypes.number,
        platform: PropTypes.string,
        reward: PropTypes.number,
        size: PropTypes.number
    };

    render() {
        const { size, platform, kind, name, deadlineText } = this.props;
        return (
            <div className="project-name flex-grow">
                <h4>{name}</h4>
                <span className="project-desription">
                    {project_sizes[size].name} {platform} {kind}
                </span>
                {/* <span className="project-deadline">{deadlineText}</span> */}
                {this.props.children}
            </div>
        );
    }
}

export default ProjectName;
