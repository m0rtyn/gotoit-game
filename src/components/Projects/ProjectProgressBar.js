import React, { Component } from "react";
import { project_bars } from "../../game/knowledge/projects";
import { colors } from "../../game/knowledge/colors";
import Bar from "../Bar/Bar";

class ProjectProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }
    render() {
        let project = this.props.project;
        let sum_design, sum_prog, sum_manage;
        let design_data, prog_data, manage_data;
        if (project.type === "own") {
            sum_design = project.done.design + project.bugs.design;
            design_data = [
                {
                    name: "Design bugs",
                    width: (100 / sum_design) * project.bugs.design,
                    color: colors.design.colorBug,
                    value: project.bugs.design,
                    id: project.id + project_bars.design_bugs.id
                },
                {
                    name: "Design completed",
                    width: (100 / sum_design) * project.done.design,
                    color: colors.design.colorCompleted,
                    value: project.done.design,
                    id: project.id + project_bars.design_completed.id
                }
            ];
            sum_prog = project.done.program + project.bugs.program;
            prog_data = [
                {
                    name: "Program bugs",
                    width: (100 / sum_prog) * project.bugs.program,
                    color: colors.program.colorBug,
                    value: project.bugs.program,
                    id: project.id + project_bars.program_bugs.id
                },
                {
                    name: "Program completed",
                    width: (100 / sum_prog) * project.done.program,
                    color: colors.program.colorCompleted,
                    value: project.done.program,
                    id: project.id + project_bars.program_completed.id
                }
            ];
            sum_manage = project.done.manage + project.bugs.manage;
            manage_data = [
                {
                    name: "Manage bugs",
                    width: (100 / sum_manage) * project.bugs.manage,
                    color: colors.manage.colorBug,
                    value: project.bugs.manage,
                    id: project.id + project_bars.manage_bugs.id
                },
                {
                    name: "Manage completed",
                    width: (100 / sum_manage) * project.done.manage,
                    color: colors.manage.colorCompleted,
                    value: project.done.manage,
                    id: project.id + project_bars.manage_completed.id
                }
            ];
        } else {
            sum_design = project.done.design + project.bugs.design + (project.estimate.design - project.done.design);

            design_data = [
                {
                    name: "Design tasks",
                    width: (100 / sum_design) * (project.estimate.design - project.done.design),
                    color: colors.design.colorEstimate,
                    value: project.estimate.design - project.done.design,
                    id: project.id + project_bars.design_tasks.id
                },
                {
                    name: "Design bugs",
                    width: (100 / sum_design) * project.bugs.design,
                    color: colors.design.colorBug,
                    value: project.bugs.design,
                    id: project.id + project_bars.design_bugs.id
                },
                {
                    name: "Design completed",
                    width: (100 / sum_design) * project.done.design,
                    color: colors.design.colorCompleted,
                    value: project.done.design,
                    id: project.id + project_bars.design_completed.id
                }
            ];
            sum_prog = project.done.program + project.bugs.program + (project.estimate.program - project.done.program);

            prog_data = [
                {
                    name: "Program tasks",
                    width: (100 / sum_prog) * (project.estimate.program - project.done.program),
                    color: colors.program.colorEstimate,
                    value: project.estimate.program - project.done.program,
                    id: project.id + project_bars.program_tasks.id
                },
                {
                    name: "Program bugs",
                    width: (100 / sum_prog) * project.bugs.program,
                    color: colors.program.colorBug,
                    value: project.bugs.program,
                    id: project.id + project_bars.program_bugs.id
                },
                {
                    name: "Program completed",
                    width: (100 / sum_prog) * project.done.program,
                    color: colors.program.colorCompleted,
                    value: project.done.program,
                    id: project.id + project_bars.program_completed.id
                }
            ];
            sum_manage = project.done.manage + project.bugs.manage + (project.estimate.manage - project.done.manage);
            manage_data = [
                {
                    name: "Manage tasks",
                    width: (100 / sum_manage) * (project.estimate.manage - project.done.manage),
                    color: colors.manage.colorEstimate,
                    value: project.estimate.manage - project.done.manage,
                    id: project.id + project_bars.manage_tasks.id
                },
                {
                    name: "Manage bugs",
                    width: (100 / sum_manage) * project.bugs.manage,
                    color: colors.manage.colorBug,
                    value: project.bugs.manage,
                    id: project.id + project_bars.manage_bugs.id
                },
                {
                    name: "Manage completed",
                    width: (100 / sum_manage) * project.done.manage,
                    color: colors.manage.colorCompleted,
                    value: project.done.manage,
                    id: project.id + project_bars.manage_completed.id
                }
            ];
        }

        return (
            <div className="project-progress-bar">
                {prog_data[0].value !== 0 ? (
                    <div className="flexbox">
                        <span className="icon-program" id={`${project.id}_program`} />
                        <Bar className="flex-grow" bar_data={prog_data} />
                    </div>
                ) : (
                    ""
                )}
                {design_data[0].value !== 0 ? (
                    <div className="flexbox">
                        <span className="icon-design" id={`${project.id}_design`} />
                        <Bar className="flex-grow" bar_data={design_data} />
                    </div>
                ) : (
                    ""
                )}
                {manage_data[0].value !== 0 ? (
                    <div className="flexbox">
                        <span className="icon-manage" id={`${project.id}_manage`} />
                        <Bar className="flex-grow" bar_data={manage_data} />
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default ProjectProgressBar;
