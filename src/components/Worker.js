/* eslint-disable */
import React, { Component } from "react";
import _ from "lodash";
import StatsProgressBar from "./StatsProgressBar";
import { colors } from "../game/knowledge/colors";
import WorkerHappinessBar from "./WorkerHappinessBar";
import WorkerStaminaBar from "./WorkerStaminaBar";
import { Avatar } from "./Projects/Avatar";
import Modal from "./Modal/Modal";
import WorkerModal from "./Modal/WorkerModal";
import { DefaultClickSoundButton } from "../game/knowledge/sounds";

//import {addAction} from '../components/ToastNest';


class Worker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    }
    this.manage = this.manage.bind(this);
    this.manageAll = this.manageAll.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

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
  closeModal(){
    this.setState({ modalOpen: false });
  }
  openModal(){
    this.setState({ modalOpen: true });
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
      <DefaultClickSoundButton onClick={() => this.openModal() } className="btn btn-manage">Manage</DefaultClickSoundButton>
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
        className={`
          card worker gap-items-2
          ${data.hovered_workers_id || [].includes(worker.id) ? 'hovered' : ''}
          ${worker.in_vacation ? 'vacation' : ''}
        `}
        id={worker.id}
      >
        <div style={{ position: 'relative', width: '80px', height: '80px'}}>
          <Avatar
            className="worker-avatar"
            name={worker.name}
            // style={{ position: 'absolute'}}
            sources={_.toPairs(worker.avatar)}
          />
        </div>
        <div className="worker-info">
          <header className="card-header">
            <h2 className="worker-name"> {worker.name} </h2>
            {manage_button}
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
        {
          this.state.modalOpen ? (
          <Modal closeModal={this.closeModal} showCloseButton={true}>
            <WorkerModal data={data} worker={worker} stats_progressbar_data={stats_progressbar_data}/>
          </Modal>
          ) : ''
        }
      </div>
    );
  }
}

export default Worker;
