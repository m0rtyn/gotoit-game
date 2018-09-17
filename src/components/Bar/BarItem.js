import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import styled from "styled-components";

/*const ProgressBar = styled.div`
    background-color: ${props => props.color};
    width: ${props => props.width}%;
`;*/

class BarItem extends PureComponent {
    static defaultProps = {
        width: 0,
        value: ""
    };

    static propTypes = {
        id: PropTypes.string,
        color: PropTypes.string,
        name: PropTypes.string,
        showName: PropTypes.bool,
        value: PropTypes.string,
        width: PropTypes.number
    };

    render() {
        let { id, showName, name, value, color, width } = this.props;
        return (
            <div
                style={{
                    background: color,
                    width: `${width}%`
                }}
                id={id}
                className="progress-bar transition"
                role="progressbar"
            >
                {value + " "} {showName ? name : null}
            </div>
        );
    }
}

export default BarItem;
