import React, { Component } from 'react';
import StatsBar from './StatsBar';
import ProjectName from './ProjectName';
import StatsProgressBar from './StatsProgressBar';
import { colors } from '../game/knowledge/colors';
import { workers_bonus_items } from '../game/knowledge/workers';
import { skills_names } from '../game/knowledge/skills';
import { education } from '../game/knowledge/education';
import WorkerHappinessBar from './WorkerHappinessBar';
import WorkerStaminaBar from './WorkerStaminaBar';

class ModalWorker extends Component {

render() {
  <section className="worker-modal">

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
          <>
            {worker.is_player
              ? ( '' )
              : (
                <div className="worker-salary">
                  <h3>
                    {worker.getSalary()}
                    $
                  </h3>
                  {/* // Overrate bonus:{' '} {worker.getOverrate()} % */}
                  <button
                  className="btn btn-danger px-8"
                  onClick={() => { data.helpers.riseEmployer(worker.id); }}
                  >
                    <h4 className="fw-700 mb-0 text-white">+10%</h4>
                  </button>
                </div>
              )
            }
          </>
        </div>
        <div className="worker-stamina">
          <WorkerStaminaBar worker={worker} />
          <button
          className={
            'btn btn-danger btn-sm worker-vacation '
            + (worker.in_vacation || worker.to_vacation ? 'disabled' : '')
          }
          onClick={ () => { worker.proposeVacation(); } }
          disabled={worker.in_vacation || worker.to_vacation}
          >
            <h5 className="mb-0 text-white text-center">Propose vacation</h5>
          </button>
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
      <ul className="nav nav-tabs nav-tabs-light-mode">
        <li className="nav-item">
          <a
          className={`nav-link ${state.currentTab === 0 ? 'active show' : ''}`}
          onClick={ () => { this.setState({ currentTab: 0 }); } }
          >
            <h3>Character</h3>
          </a>
        </li>
        <li className="nav-item">
          <a
          className={"nav-link " + (state.currentTab === 1 ? 'active show' : '')}
          onClick={() => { this.setState({ currentTab: 1 }); } }
          >
            <h3>Instrumentary</h3>
          </a>
        </li>
      </ul>
      <>
        {
          ( ()=>{
            if (state.currentTab === 0){
              return character
            } else if (state.currentTab === 1){
              return instrumentary
            }
          } )()
        }
      </>
    </div>
  </section>
}

export default WorkerModal;
