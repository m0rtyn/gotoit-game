import React, {Component} from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

class Bar extends Component {
    render() {
        let { bar_data } = this.props;
        return (
            <div className="progress">
                { bar_data.map( (item, i) =>
                    <OverlayTrigger key={i} delay={150} placement="bottom"
                        overlay={
                            <Tooltip id={`Tooltip${i}`}>
                                <div>
                                    {item.name + ': ' + item.value}
                                </div>
                            </Tooltip>
                        }>
                        <div className="progress-bar" role="progressbar" 
                            id={item.id} 
                            style={{
                                width: item.width +'%', 
                                backgroundColor: item.color
                            }}>
                            { ' '+item.value} { item.showName ? item.name : null }
                        </div>
                    </OverlayTrigger>)}
            </div>
        );
    }
}

export default Bar;
