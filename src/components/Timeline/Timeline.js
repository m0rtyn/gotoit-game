import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import DeadLine from './OverlayTriggers/DeadLine';
import VacationAndLeave from './OverlayTriggers/VacationAndLeave';
import { TimeLineStep } from './TimeLineStep';

const timelineWidth = window.innerWidth;

class Timeline extends Component {
  static propTypes = {
    data: PropTypes.shape()
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
                <TimeLineStep
                  key={index}
                  index={index}
                  length={timelineScale.length}
                  day={day}
                  events={events}
                  f={(item, index) => {
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
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Timeline;
