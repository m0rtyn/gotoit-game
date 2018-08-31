import React, { PureComponent } from "react";
import { colors } from "../../game/knowledge/colors";
import Bar from "../Bar/Bar";

class ProjectDeadlineBar extends PureComponent {
    render() {
        let { project } = this.props;
        const bar_data = [
            {
                name: "gone",
                width: 100 - (project.deadline / project.deadline_max) * 100,
                color: project.deadline / project.deadline_max < 0.1 ? colors.danger : colors.warning,
                value: project.deadline_max - project.deadline,
                showName: true
            },
            {
                name: "to deadline",
                width: (project.deadline / project.deadline_max) * 100,
                color: colors.success,
                value: project.deadline,
                showName: true
            }
        ];
        return (
            <div>
                <Bar bar_data={bar_data} />
            </div>
        );
    }
}

ProjectDeadlineBar.propTypes = {};

export default ProjectDeadlineBar;
