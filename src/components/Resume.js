import React, { Component } from 'react';

class Resume extends Component {
  render() {
    let data = this.props.data;
    let worker = this.props.worker;
    console.log(data.workers[worker]);
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
              className="worker-avatar"
              alt={worker.name + ' avatar'}
              src={worker.avatar}
            />
          </span>
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
        </div>
        <h2>Character:</h2>
        <h3>
          {worker.character.name}. {worker.character.description}
        </h3>
        {!worker.hired ? (
          <div>
            <button
              className="btn btn-success"
              id={worker.id}
              onClick={e => {
                this.props.data.helpers.hireCandidate(e.target.id, 'resumes');
                this.props.closePopup();
              }}
            >
              Hire
            </button>
            <button
              className="btn btn-danger"
              id={worker.id}
              onClick={e => {
                this.props.data.helpers.rejectCandidate(e.target.id, 'resumes');
                this.props.closePopup();
              }}
            >
              Hide
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

Resume.propTypes = {};

export default Resume;
