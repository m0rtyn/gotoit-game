import React from 'react';

const HistoricalEvent = props => {
  return (
    <div>
      <div className="flexbox">
        <span className="flex-grow">
          <h2>{props.event.title}</h2>
        </span>
        <span>
          <button
            className="btn btn-warning"
            onClick={() => {
              props.closePopup();
            }}
          >
            Close
          </button>
        </span>
      </div>
      <div>{`Today ${props.date}, ${props.event.description}`}</div>
    </div>
  );
};

export default HistoricalEvent;
