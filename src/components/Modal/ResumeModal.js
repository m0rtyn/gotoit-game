import React, { Component } from 'react';
import { current_tick } from '../../App';
import { resume_will_expire_after } from '../../game/knowledge/workers';

class Resume extends Component {
  render() {
    // console.log(current_tick);
    let data = this.props.data;
    let worker = this.props.letter.object;
    let expired = this.props.letter.expired;
    let createdAt = this.props.letter.createdAt;
    let hours_to_expire = Math.round(
      createdAt + resume_will_expire_after - current_tick
    );
    let gender_pointer = (() => {
      if (worker.gender === 'male') return 'him';
      if (worker.gender === 'female') return 'her';
      if (worker.gender === 'other') return 'them';
    })();
    const buttons = (
      <div>
        <button
          className="btn btn-success"
          id={worker.id}
          onClick={e => {
            if (data.workers.length !== data.office.space) {
              this.props.data.helpers.hireCandidate(e.target.id, 'resumes');
              worker.hired = true;
              this.props.closePopup();
            } else {
              alert('Your office is full');
            }
          }}
        >
          Accept
        </button>
        <button
          className="btn btn-danger"
          id={worker.id}
          onClick={e => {
            this.props.data.helpers.rejectCandidate(e.target.id, 'resumes');
            expired = true;
            this.props.closePopup();
          }}
        >
          Reject
        </button>
      </div>
    );

    return (
      <section className="resume">
        <div className="modal-header">
          <img
            className="resume-avatar"
            alt={worker.name + ' avatar'}
            src={worker.avatar}
          />
          <h3>{worker.character.name}</h3>
        </div>

        <div className="modal-body">
          <h5>{worker.character.description}</h5>
          <span className="resume-info">
            <h3>{worker.name}</h3>
            <h3>Gender: {worker.gender}</h3>
            <h3>Salary: ${worker.salary} per month</h3>
          </span>
          <span>
            <h3>Design: {worker.stats.design}</h3>
            <h3>Program: {worker.stats.program}</h3>
            <h3>Manage: {worker.stats.manage}</h3>
          </span>

          {!expired ? <h3>{`Will expire in ${hours_to_expire} hours`}</h3> : ''}
          {!worker.hired ? (
            !expired ? (
              buttons
            ) : (
              <h3>{'This employer found another job.'}</h3>
            )
          ) : (
            <h3>{`You already hired ${gender_pointer}`}</h3>
          )}
        </div>
      </section>
    );
  }
}

Resume.propTypes = {};

export default Resume;
