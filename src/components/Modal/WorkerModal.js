import React, { Component } from "react";
import * as PropTypes from "prop-types";
import StatsProgressBar from "../StatsProgressBar";
import { workers_bonus_items } from "../../game/knowledge/workers";
import { skills_names } from "../../game/knowledge/skills";
import WorkerHappinessBar from "../WorkerHappinessBar";
import WorkerStaminaBar from "../WorkerStaminaBar";
import { Avatar } from "../Projects/Avatar";
import _ from "lodash";

export default class ModalWorker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0
        };
        this.dismiss = this.dismiss.bind(this);
    }
    static propTypes = {
        worker: PropTypes.object,
        data: PropTypes.object,
        stats_progressbar_data: PropTypes.object
    };
    dismiss() {
        this.props.data.helpers.dismissEmployer(this.props.worker.id);
    }
    render() {
        let { worker, data, stats_progressbar_data } = this.props;
        let state = this.state;
        let character = (
            <div className="worker-character">
                <div className="row px-24">
                    <div className="col-6">
                        {worker.in_vacation || worker.to_vacation ? (
                            worker.in_vacation ? (
                                <h4>Worker in vacation</h4>
                            ) : (
                                <h4>Going on vacation in {Math.floor(worker.to_vacation_ticker / 24)} days</h4>
                            )
                        ) : (
                            ""
                        )}
                        <p>
                            <strong className="mb-0">{`${worker.character.name}`}</strong>
                            <br />
                            {`${worker.character.description}.`}
                        </p>
                        <p>{worker.tellFeelings()}</p>
                        <>
                            {worker.is_player ? (
                                ""
                            ) : (
                                <button className="btn btn-danger btn-sm worker-dismiss" onClick={this.dismiss}>
                                    Dismiss an employee
                                </button>
                            )}
                        </>
                    </div>
                    <div className="col-6 worker-statistic">
                        <h4 className="text-center fw-700 text-fade">Employee statistic</h4>
                        {worker.get_monthly_salary ? (
                            ""
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

                        <ul className="statistic-list mb-0">
                            {!worker.is_player ? (
                                <li className="statistic-item">
                                    Got of salary <span>{worker.facts.money_earned}$</span>
                                </li>
                            ) : (
                                ""
                            )}
                            <li className="statistic-item">
                                Hired (days ago) <span>{Math.ceil((this.props.data.date.tick - worker.facts.tick_hired) / 24)}</span>
                            </li>
                            <li className="statistic-item">
                                Projects finished <span>{worker.facts.project_finished}</span>
                            </li>
                            <li className="statistic-item">
                                Tasks done{" "}
                                <span>
                                    {worker.facts.tasks_done} of {worker.facts.tasks_done + worker.facts.bugs_passed}
                                </span>
                            </li>
                            <li className="statistic-item">
                                Bugs prodused
                                <span>{worker.facts.bugs_passed}</span>
                            </li>
                            <li className="statistic-item">
                                Refactoring done <span>{worker.facts.refactored}</span>
                            </li>
                            <li className="statistic-item">
                                Tests wrote <span>{worker.facts.tests_wrote}</span>
                            </li>
                            <li className="statistic-item">
                                Retrospected tasks <span>{worker.facts.retrospected}</span>
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
                            {Object.keys(workers_bonus_items[skill]).map(item_key => {
                                let item = workers_bonus_items[skill][item_key];
                                return worker.items[skill][item_key] === true ? (
                                    <div className="" key={item_key}>
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                ) : (
                                    <div className="" key={item_key}>
                                        <h3>{item.name}</h3>
                                        <button
                                            className={data.money >= item.money ? "btn btn-info btn-sm" : "btn btn-info btn-sm disabled"}
                                            title={item.description}
                                            id={item}
                                            onClick={() => {
                                                if (data.money >= item.money) {
                                                    data.helpers.buyItem(worker, skill, item_key);
                                                }
                                            }}
                                        >
                                            Buy {item.name} ${item.money}
                                        </button>
                                        <p>{item.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );

        return (
            <section className="worker-modal">
                <div className="modal-header">
                    <div style={{ position: "relative", width: "200px", height: "200px" }}>
                        <Avatar
                            className="worker-avatar"
                            name={worker.name}
                            style={{ position: "absolute" }}
                            size={200}
                            sources={_.toPairs(worker.avatar)}
                        />
                    </div>
                    <div className="worker-info">
                        <h3 className="worker-name">
                            {worker.name}
                            {worker.in_vacation ? " on vacation! " : ""}
                        </h3>
                        <div className="worker-happiness">
                            <WorkerHappinessBar worker={worker} />
                            <>
                                {worker.is_player ? (
                                    ""
                                ) : (
                                    <div className="worker-salary">
                                        <h3>{worker.getSalary()}$</h3>
                                        {/* // Overrate bonus:{' '} {worker.getOverrate()} % */}
                                        <button
                                            className="btn btn-danger px-8"
                                            onClick={() => {
                                                data.helpers.riseEmployer(worker.id);
                                            }}
                                        >
                                            <h4 className="fw-700 mb-0 text-white">+10%</h4>
                                        </button>
                                    </div>
                                )}
                            </>
                        </div>

                        <div className="worker-stamina">
                            <WorkerStaminaBar worker={worker} />

                            <button
                                className={
                                    "btn btn-danger btn-sm worker-vacation " + (worker.in_vacation || worker.to_vacation ? "disabled" : "")
                                }
                                onClick={() => {
                                    worker.proposeVacation();
                                }}
                                disabled={worker.in_vacation || worker.to_vacation}
                            >
                                <h5 className="mb-0 text-white text-center">Propose vacation</h5>
                            </button>
                        </div>

                        <div className="worker-stats">
                            {skills_names.map(skill => {
                                return (
                                    <StatsProgressBar
                                        max_stat={data.max_stat}
                                        key={skill}
                                        type={skill}
                                        stats={stats_progressbar_data}
                                        worker={worker}
                                        data={data}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="modal-body">
                    <ul className="nav nav-tabs nav-tabs-light-mode">
                        <li className="nav-item">
                            <a
                                className={`nav-link ${state.currentTab === 0 ? "active show" : ""}`}
                                onClick={() => {
                                    this.setState({ currentTab: 0 });
                                }}
                            >
                                <h3>Character</h3>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={"nav-link " + (state.currentTab === 1 ? "active show" : "")}
                                onClick={() => {
                                    this.setState({ currentTab: 1 });
                                }}
                            >
                                <h3>Instrumentary</h3>
                            </a>
                        </li>
                    </ul>

                    <>
                        {(() => {
                            if (state.currentTab === 0) {
                                return character;
                            } else if (state.currentTab === 1) {
                                return instrumentary;
                            }
                        })()}
                    </>
                </div>
            </section>
        );
    }
}
