import React, { Component } from 'react';
import { colors, project_bars } from '../game/knowledge';
import Bar from './Bar/Bar';

class ProjectProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  render() {
    let project = this.props.project;
    let errors = project.bugsQuantity();
    let max = Math.max(project.planedTasksQuantity(), project.tasksQuantity());
    let sum = max + errors;
    let k = 100 / sum;
    const bar_data = [
      {
        name: 'Design tasks',
        width: k * (project.estimate.design - project.done.design),
        color: colors.design.colorEstimate,
        value: project.estimate.design - project.done.design,
        id: project.id + project_bars.design_tasks.id
      },
      {
        name: 'Design bugs',
        width: k * project.bugs.design,
        color: colors.design.colorBug,
        value: project.bugs.design,
        id: project.id + project_bars.design_bugs.id
      },
      {
        name: 'Design completed',
        width: k * project.done.design,
        color: colors.design.colorCompleted,
        value: project.done.design,
        id: project.id + project_bars.design_completed.id
      },
      {
        name: 'Program tasks',
        width: k * (project.estimate.program - project.done.program),
        color: colors.program.colorEstimate,
        value: project.estimate.program - project.done.program,
        id: project.id + project_bars.program_tasks.id
      },
      {
        name: 'Program bugs',
        width: k * project.bugs.program,
        color: colors.program.colorBug,
        value: project.bugs.program,
        id: project.id + project_bars.program_bugs.id
      },
      {
        name: 'Program completed',
        width: k * project.done.program,
        color: colors.program.colorCompleted,
        value: project.done.program,
        id: project.id + project_bars.program_completed.id
      },
      {
        name: 'Manage tasks',
        width: k * (project.estimate.manage - project.done.manage),
        color: colors.manage.colorEstimate,
        value: project.estimate.manage - project.done.manage,
        id: project.id + project_bars.manage_tasks.id
      },
      {
        name: 'Manage bugs',
        width: k * project.bugs.manage,
        color: colors.manage.colorBug,
        value: project.bugs.manage,
        id: project.id + project_bars.manage_bugs.id
      },
      {
        name: 'Manage completed',
        width: k * project.done.manage,
        color: colors.manage.colorCompleted,
        value: project.done.manage,
        id: project.id + project_bars.manage_completed.id
      }
    ];
    return (
      <div>
        <Bar bar_data={bar_data} />
      </div>
    );
  }
}

export default ProjectProgressBar;
