import React, {Component} from 'react';
import _ from 'lodash';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
const timelineWidth = window.innerWidth;


class Timeline extends Component {

    render() {
        let { timelineEvents =[] , timelineScale } = this.props.data;

        return (
            <div className="timeline-wrapper">
                <div className='col-12 timeline'>

                    <div className='line'>
                        <div
                            className='now'
                            style={{ marginLeft: timelineWidth / 2 }}
                        ></div>

                        {
                            _.map(timelineScale, (day, index) => {
                                    let events = timelineEvents.filter( (item) => {
                                        if (day.getDate() === item.time.getDate() && day.getMonth() === item.time.getMonth()) {
                                            return true
                                        } else return false
                                    });


                                    return (
                                        <div
                                        key={index}
                                        className='step'
                                        style={{ marginLeft: timelineWidth / (timelineScale.length - 1) * index + 'px' }}
                                        >
                                            
                                            <div>
                                                {day.getDate()}
                                            </div>

                                            <div className="worker-portrait">
                                            {
                                                _.map(events, (item, index) => {
                                                    if (item.type === 'deadline') {
                                                        return (

                                                            <OverlayTrigger 
                                                            key={index}
                                                            delay={150}
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id={`Tooltip${index}`}>
                                                                    <div>
                                                                        {item.info + ': ' + item.object.name}
                                                                    </div>
                                                                </Tooltip>
                                                            }>
                                                                <div style={{ position: 'relative' }}>
                                                                    <div style={{ position: 'absolute' }}>
                                                                        <img 
                                                                        alt={item.object.name + ' platform'} 
                                                                        src={item.object.avatar.platform}
                                                                        width={20} 
                                                                        height={20}
                                                                        />
                                                                    </div>
                                                                    <div style={{ position: 'absolute' }}>
                                                                        <img alt={item.object.name + ' kind'} src={item.object.avatar.kind}
                                                                            width={20} height={20}/>
                                                                    </div>
                                                                </div>
                                                            </OverlayTrigger>

                                                        )
                                                    } else if (item.type === 'vacation' || item.type === 'leave'){
                                                        return (
                                                            <OverlayTrigger 
                                                            key={index} 
                                                            delay={150} 
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id={`Tooltip${index}`}>
                                                                    <div>
                                                                        {item.info + ': ' + item.object.name}
                                                                    </div>
                                                                </Tooltip>
                                                            }>
                                                                <img 
                                                                className='worker-portrait'
                                                                src={item.object.avatar}
                                                                role="presentation"
                                                                />

                                                            </OverlayTrigger>
                                                        )
                                                    } else return null

                                                })

                                            }
                                            </div>

                                        </div>
                                    )
                                }

                            )
                        }
                    </div>

                </div>
            </div>
        );
    }
}

Timeline.propTypes = {
};

export default Timeline;
