import React, { Component } from 'react';
import { current_tick } from '../App';
import { resume_will_expire_after } from '../game/knowledge';

class Resume extends Component {
  render() {
    console.log(current_tick);
    let data = this.props.data;
    let resume = this.props.resume;
    let days_to_expire = Math.round(
      (this.props.resume.createdAt + resume_will_expire_after - current_tick) /
        24
    );
    const buttons = (
      <div>
        <button
          className="btn btn-success"
          id={resume.worker.id}
          onClick={e => {
            this.props.data.helpers.hireCandidate(e.target.id, 'resumes');
            resume.worker.hired = true;
            this.props.closePopup();
          }}
        >
          Accept
        </button>
        <button
          className="btn btn-danger"
          id={resume.worker.id}
          onClick={e => {
            this.props.data.helpers.rejectCandidate(e.target.id, 'resumes');
            resume.expired = true;
            this.props.closePopup();
          }}
        >
          Reject
        </button>
      </div>
    );
    return (
      <div>
        <div className="flexbox">
          <span className="flex-grow">
            <h2 className="resume-title ">Resume</h2>
          </span>
          <span>
            <button
              className="btn btn-warning "
              onClick={() => {
                //data.helpers.projectArchiving();
                this.props.closePopup();
              }}
            >
              Close
            </button>
          </span>
        </div>
        <div className="flexbox flex-justified">
          <span>
            {' '}
            <img
              className="resume-avatar"
              alt={resume.worker.name + ' avatar'}
              src={resume.worker.avatar}
            />
          </span>
          <span className="resume-info">
            <h3>{resume.worker.name}</h3>
            <h3>Gender: {resume.worker.gender}</h3>
            <h3>Salary: ${resume.worker.salary} per month</h3>
          </span>
          <span>
            <h3>Design: {resume.worker.stats.design}</h3>
            <h3>Program: {resume.worker.stats.program}</h3>
            <h3>Manage: {resume.worker.stats.manage}</h3>
          </span>
        </div>
        <h2>Character:</h2>
        <h3>
          {resume.worker.character.name}. {resume.worker.character.description}
        </h3>
        {!resume.expired ? `Will expire in ${days_to_expire} days` : ''}
        {!resume.worker.hired
          ? !resume.expired
            ? buttons
            : 'This resume is expired'
          : 'This employer is already hired'}
      </div>
    );
  }
}

Resume.propTypes = {};

export default Resume;
