import React, {Component} from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

class Bar extends Component {
    render() {
        return (
            <div className="progress slim">
                { this.props.bar_data.map( (item, i) =>
                    <OverlayTrigger key={i} delay={150} placement="bottom"
                                    overlay={
                                        <Tooltip id={`Tooltip${i}`}>
                                            <div>
                                                {item.name + ': ' + item.value}
                                            </div>
                                        </Tooltip>
                                    }>
                        <div className="progress-bar" role="progressbar"
                             style={{
                                 width: item.width +'%',
                                 backgroundColor: item.color
                             }}>
                            <label>{item.value}</label>
                        </div>
                    </OverlayTrigger> }
            </div>
        );
    }
}

export default Bar;
