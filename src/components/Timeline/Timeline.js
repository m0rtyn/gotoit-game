import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import DeadLine from './OverlayTriggers/DeadLine';
import VacationAndLeave from './OverlayTriggers/VacationAndLeave';
const timelineWidth = window.innerWidth;

class Timeline extends Component {
  static propTypes = {
    data: PropTypes.shape(),
  };

  render() {
    let { timelineEvents = [], timelineScale } = this.props.data;

    return (
      <div className="timeline-wrapper">
        <div className="col-12 timeline">
          <div className="line">
            <div className="now" style={{ marginLeft: timelineWidth / 2 }} />
            {_.map(timelineScale, (day, index) => {
              let events = timelineEvents.filter(item => {
                if (
                  day.getDate() === item.time.getDate() &&
                  day.getMonth() === item.time.getMonth()
                ) {
                  return true;
                } else return false;
              });

              return (
                <div
                  key={index}
                  className="step"
                  style={{
                    marginLeft:
                      (timelineWidth / (timelineScale.length - 1)) * index +
                      'px',
                  }}
                >
                  <div>{day.getDate()}</div>

                  <div className="worker-portrait">
                    {_.map(events, (item, index) => {
                      if (item.type === 'deadline') {
                        return (
                          <DeadLine
                            index={index}
                            info={item.info}
                            name={item.object.name}
                            avatar={item.object.avatar}
                          />
                        );
                      } else if (
                        item.type === 'vacation' ||
                        item.type === 'leave'
                      ) {
                        return (
                          <VacationAndLeave
                            index={index}
                            info={item.info}
                            name={item.object.name}
                            avatar={item.object.avatar}
                          />
                        );
                      } else return null;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Timeline;
