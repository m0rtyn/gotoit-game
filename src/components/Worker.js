/* eslint-disable */
import React, { Component } from 'react';
import Portal from 'react-portal';
import _ from 'lodash';
import TeamDialog from './TeamDialog';
import StatsBar from './StatsBar';
import ProjectName from './ProjectName';
import StatsProgressBar from './StatsProgressBar';
import { colors } from '../game/knowledge/colors';
import { workers_bonus_items } from '../game/knowledge/workers';
import { skills_names } from '../game/knowledge/skills';
import { education } from '../game/knowledge/education';
import WorkerHappinessBar from './WorkerHappinessBar';
import WorkerStaminaBar from './WorkerStaminaBar';


//import {addAction} from '../components/ToastNest';


class Worker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    }
    this.manage = this.manage.bind(this);
    this.manageAll = this.manageAll.bind(this);
    this.dismiss = this.dismiss.bind(this);
  }
  // shouldComponentUpdate() {
  //   return false;
  // }
  UNSAFE_componentWillMount() {
    let data = this.props.data;
    data.workers.forEach(worker => {
      if (worker.stats.design > data.max_stat)
        data.max_stat = worker.stats.design;
      if (worker.stats.program > data.max_stat)
        data.max_stat = worker.stats.program;
      if (worker.stats.manage > data.max_stat)
        data.max_stat = worker.stats.manage;
    });
  }
  componentDidMount() {
    /*
        if (this.props.worker.is_player) {
            addAction('This is the management screen of your character. Here you can select their roles in the company. Review carefully information on this screen, then try a Training Project.', {timeOut: 10000, extendedTimeOut: 5000}, 'success');
        }
        */
    //this.refs.manage.openPortal();
  }

  manage(event) {
    this.props.data.helpers.modifyRelation(
      this.props.worker.id,
      event.target.id,
      event.target.checked
    );
  }

  manageAll(event) {
    this.props.data.helpers.modifyRelation(
      this.props.worker.id,
      null,
      event.target.checked
    );
  }

  dismiss() {
    this.props.data.helpers.dismissEmployer(this.props.worker.id);
  }

  teach(skill, source) {
    //  console.log(skill, source);

    switch (source) {
      case 'training':
        this.props.data.helpers.trainingProject(this.props.worker, skill);
        break;
      default:
        console.log('WTF?');
    }
  }

  render() {
    const data = this.props.data;
    let state = this.state;
    const worker = this.props.worker;

    const manage_button = (
      <button className="btn btn-primary btn-xs">Manage</button>
    );

    const stats_progressbar_data = _.mapValues(worker.stats, (val, stat) => {
      return {
        name: stat,
        value: worker.getStatsData(stat),
        color: colors[stat].colorCompleted
      };
    });


    /*const stats_data = _.mapValues(worker.stats, (val, stat) => {
            return {
                name: stat,
                val: worker.getStatsData(stat)
            };
        });*/

    const efficiency_data = {
      work_load: { name: 'Work Load', val: worker.workloadPenalty() },
      work_difficulty: {
        name: 'Task Difficulty',
        val: worker.difficultyPenalty()
      },
      education: { name: 'Education Balance', val: worker.educationPenalty() },
      collective: { name: 'Collective', val: worker.collectivePenalty() }
    };

    let character = (
      <div className="worker-character">
        <div className="row pl-24 pr-24">
          <div className="col-6">
            <p>
              <strong>
              {`${worker.character.name}`}
              </strong>
              <br/>
              {`${worker.character.description}.`}
            </p>
            {!worker.is_player
              ? (<span>Got {worker.facts.money_earned}$ of salary.</span>)
              : ('')
            }
            <p>
              {worker.tellFeelings()}
            </p>
            {worker.is_player ? (
              ''
            ) : (
              <span>
                Worker salary: ${worker.getSalary()}. Overrate bonus:{' '}
                {worker.getOverrate()}
                %.
                <button
                  className="btn btn-danger btn-link"
                  onClick={() => {
                    data.helpers.riseEmployer(worker.id);
                  }}
                >
                  Rise Salary
                </button>
              </span>
            )}
          </div>
          <div className="col-6 worker-statistic">
            <h4 className="text-center">Employee statistic</h4>
            {worker.get_monthly_salary ? (
              ''
            ) : (
              <span>
                <button
                  className="btn btn-danger btn-link"
                  onClick={() => {
                    data.helpers.paySalary(worker);
                  }}
                >
                  Pay a debt
                </button>
              </span>
            )}

            <ul className="statistic-list">
              <li className="statistic-item">
                Hired (days ago){' '}
                <span>
                  {Math.ceil(
                    (this.props.data.date.tick - worker.facts.tick_hired) /
                      24
                  )}
                </span>
              </li>
              <li className="statistic-item">
                Projects finished{' '}
                <span>
                  {worker.facts.project_finished}
                </span>
              </li>
              <li className="statistic-item">
                Tasks done{' '}
                <span>
                  {worker.facts.tasks_done} of{' '} {worker.facts.tasks_done + worker.facts.bugs_passed}
                </span>
              </li>
              <li className="statistic-item">
                Bugs prodused
                <span>
                  {worker.facts.bugs_passed}
                </span>
              </li>
              <li className="statistic-item">
                Refactoring done{' '}
                <span>
                  {worker.facts.refactored}
                </span>
              </li>
              <li className="statistic-item">
                Tests wrote{' '}
                <span>
                  {worker.facts.tests_wrote}
                </span>
              </li>
              <li className="statistic-item">
                Retrospected tasks{' '}
                <span>
                  {worker.facts.retrospected}
                </span>
              </li>
            </ul>
          </div>
        </div>


        {/* ====UNUSABLE CONTENT==== */}
        {/* <div>
          Which projects {worker.name} has to work?
          <div className="card">
            {data.projects.map(project => {
              const stats_data = _.mapValues(
                project.needs,
                (val, skill) => {
                  return {
                    name: skill,
                    val: (
                      <div key={worker.id + project.id} className="">
                        <div style={{ width: '100%' }}>
                          <input
                            type="checkbox"
                            id={project.id || ''}
                            checked={data.helpers.getRelation(
                              worker.id,
                              project.id,
                              skill
                            )}
                            onChange={event => {
                              data.helpers.modifyRelation(
                                worker.id,
                                event.target.id,
                                event.target.checked,
                                skill
                              );
                            }}
                          />
                          {project.needs(skill) +
                            '/' +
                            project.estimate[skill]}
                        </div>
                      </div>
                    )
                  };
                }
              );
              return (
                <div key={worker.id + project.id}>
                  <div>
                    <ProjectName project={project} />
                  </div>
                  <StatsBar
                    stats={stats_data}
                    data={this.props.data}
                  />
                </div>
              );
            })}
          </div>
        </div> */}
        {/* ================ */}

        {/* =====DEPRECATED TRAINING PROJECT====
        <div>
          <div className="text-center">
            {Object.keys(education).map(
              source =>
                !education[source].hide ? (
                  <div className="" key={source}>
                    {skills_names.map(skill => {
                      return (
                        <div className="" key={skill}>
                          <button
                            className="btn btn-info"
                            title={education[source].description}
                            id={source}
                            onClick={() => this.teach(skill, source)}
                          >
                            {education[source].name}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ''
                )
            )}
          </div>
        </div> */}

      </div>
    );

    let instrumentary = (
      <div className="worker-instrumentary flexbox flex-justified">
        {skills_names.map(skill => {
          return (
            <div className="card instrumentary" key={skill}>
              {Object.keys(workers_bonus_items[skill]).map(
                item_key => {
                  let item =
                    workers_bonus_items[skill][item_key];
                  return (
                    worker.items[skill][item_key] === true
                    ? (
                      <div className="" key={item_key}>
                        <h3>
                          {item.name}
                        </h3>
                        <p>
                          {item.description}
                        </p>
                      </div>
                    )
                    : (
                      <div className="" key={item_key}>
                        <h3>
                          {item.name}
                        </h3>
                        <button
                        className={
                          data.money >= item.money
                          ? 'btn btn-info btn-sm'
                          : 'btn btn-info btn-sm disabled'
                        }
                        title={item.description}
                        id={item}
                        onClick={() => {
                          if (data.money >= item.money) {
                            data.helpers.buyItem(
                              worker,
                              skill,
                              item_key
                            );
                          }
                        }}
                        >
                          Buy {item.name} ${item.money}
                        </button>
                        <p>
                          {item.description}
                        </p>
                      </div>
                    )
                  )
                }
              )}
            </div>
          );
        })}
      </div>
    );

    return (
      <div
        onMouseOver={() => {
          data.helpers.modifyHoveredObjects(
            data.projects.filter(project => {
              return data.helpers.deepCheckRelation(worker, project);
            }),
            [worker]
          );
        }}
        onMouseOut={() => {
          data.helpers.modifyHoveredObjects();
        }}
        className={`card worker gap-items-2 ${
          data.hovered_workers_id || [].includes(worker.id) ? 'hovered' : ''
        } ${worker.in_vacation ? 'vacation' : ''}`}
        id={worker.id}
      >
        <div style={{ position: 'relative', width: '80px', height: '80px'}}>
          {
            _.map(worker.avatar, img => {
              return (
                <img style={{ position: 'absolute', width: '80px', height: '80px' }} src={img} />
              )
            })
          }
        </div>
      <div className="worker-info">
          <header className="card-header">
            <span className="worker-name"> {worker.name} </span>

            <Portal
              ref="manage"
              closeOnEsc
              closeOnOutsideClick
              openByClickOn={manage_button}
            >

              <TeamDialog>

                <div className="modal-header">
                  <div style={{ position: 'relative', width: '200px', height: '200px'}}>
                    {
                      _.map(worker.avatar, img => {
                        return (
                          <img style={{ position: 'absolute', width: '200px', height: '200px' }} src={img} />
                        )
                      })
                    }
                  </div>
                  <div className="worker-info">
                    <h3 className="worker-name">
                      {worker.name}
                      {worker.in_vacation ? ' on vacation! ' : ''}
                    </h3>
                    <div className="worker-happiness">
                      <WorkerHappinessBar worker={worker} />
                    </div>

                    <div className="worker-stamina">
                      <WorkerStaminaBar worker={worker} />

                      {/* ====PROPOSE VACATION BUTTON==== */}
                      {worker.in_vacation || worker.to_vacation ? (
                        worker.in_vacation ? (
                          ' Worker on vacation! '
                        ) : (
                          ' Going on vacation in ' +
                          Math.floor(worker.to_vacation_ticker / 24) +
                          ' days. '
                        )
                      ) : (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => {
                            worker.proposeVacation();
                          }}
                        >
                          Propose Vacation
                        </button>
                      )}
                    </div>

                    <div className="worker-stats">
                      {skills_names.map(skill => {
                        return (
                          <StatsProgressBar
                          key={skill}
                          type={skill}
                          stats={stats_progressbar_data}
                          worker={worker}
                          data={data}
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="modal-body">
                  <ul className="nav nav-tabs nav-tabs-light-mode activity-toolbar">
                    <li className={"nav-item " + (state.currentTab === 0 ? 'active show' : '')}>
                      <a
                        className="nav-link"
                        onClick={() => {
                          this.setState({ currentTab: 0 });
                        }}
                      >
                        <span>Character</span>
                      </a>
                    </li>
                    <li className={"nav-item " + (state.currentTab === 1 ? 'active show' : '')}>
                      <a
                        className="nav-link"
                        onClick={() => {
                          this.setState({ currentTab: 1 });
                        }}
                      >
                        <span>Instrumentary</span>
                      </a>
                    </li>
                  </ul>

                  <>
                    {
                      (()=>{
                        if (state.currentTab === 0){
                          return character
                        } else if (state.currentTab === 1){
                          return instrumentary
                        }
                      })()
                    }
                  </>

                  <div>
                    {worker.is_player ? (
                      ''
                    ) : (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={this.dismiss}
                      >
                        Dismiss an employee
                      </button>
                    )}
                  </div>
                </div>
              </TeamDialog>
            </Portal>
          </header>

          <div className="card-body worker-stats">
            {/* {worker.is_player ? 'Player' : <span>{worker.getSalary()}$</span>} */}
            {/* {worker.get_monthly_salary ? '' : ' unpaid! '} */}
            {/* <div classNames('progress-bar', (100 / worker.getEfficiency() < 0.5 ? 'bg-danger' : 'bg-warning')) role="progressbar"  */}

            <WorkerHappinessBar worker={worker} />
            <WorkerStaminaBar worker={worker} />
            <div className="worker-skills">
              <StatsProgressBar
                type={'design'}
                max_stat={data.max_stat}
                stats={stats_progressbar_data}
                worker={worker}
                data={data}
              />
              <StatsProgressBar
                type={'program'}
                max_stat={data.max_stat}
                stats={stats_progressbar_data}
                worker={worker}
                data={data}
              />
              <StatsProgressBar
                type={'manage'}
                max_stat={data.max_stat}
                stats={stats_progressbar_data}
                worker={worker}
                data={data}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Worker;
