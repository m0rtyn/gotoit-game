import React, {Component} from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

class Bar extends Component {
    render() {
        let data = this.props.data.map( (item, i) =>
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
            </OverlayTrigger>
        )

        return (
            <div className="progress slim">
                { data }
            </div>
        );
    }
}

export default Bar;
