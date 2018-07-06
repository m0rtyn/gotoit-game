import React, {Component} from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import _ from 'lodash'

class Bar extends Component {
    render() {
        let { bar_data } = this.props; //must be array!
        return (
            <div className="progress">
                { _.map(bar_data, (item, i) =>
                    <div className="progress-bar" role="progressbar"
                    id={item.id}
                    style={{
                        width: item.width +'%',
                        backgroundColor: item.color
                    }}>
                    {/* { item.showName ? item.name : null }{ ' ' + item.value} */}
                    {/* TODO: ^ design temporary cleaning */}
                    </div>
                )}
            </div>
        );
    }
}

export default Bar;
