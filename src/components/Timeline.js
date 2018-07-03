import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import {project_kinds, project_platforms} from "../game/knowledge";

const timelineWidth = window.innerWidth;


class Timeline extends Component {
    constructor(props){
        super(props);
    }

    render() {
        let { timelineEvents, timelineScale } = this.props.data;

        return (
            <div className="gti-timeline-wrapper">
                <div className='col-12 gti-timeline'>

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
                                        className='step'
                                        style={{ marginLeft: timelineWidth / (timelineScale.length - 1) * index + 'px' }}
                                        >
                                            
                                            <div>
                                                {day.getDate()}
                                            </div>

                                            <div className="worker-portrait">
                                            {
                                                _.map(events, (item) => {
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
                                                                        src={require(`../../public/${project_platforms[item.object.platform].name}.svg`)}
                                                                        width={20} 
                                                                        height={20}
                                                                        />
                                                                    </div>
                                                                    <div style={{ position: 'absolute' }}>
                                                                        <img alt={item.object.name + ' kind'} src={require(`../../public/${project_kinds[item.object.kind].name}.svg`)}
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
