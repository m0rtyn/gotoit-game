import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import SplashAnimated from "./SplashAnimated";

const animation_parameters = { stiffness: 65, damping: 20 };
class BubbleAnimated extends Component {
    transitionEnd = () => {
        this.props.handleTransitionEnd();
    }
    render() {
        let { size, color, count } = this.props;
        let from, to;
        if (document.getElementById(this.props.from) !== null && document.getElementById(this.props.to) !== null) {
            from = document.getElementById(this.props.from).getBoundingClientRect();
            to = document.getElementById(this.props.to).getBoundingClientRect();
            to.x += 25;
            to.y += 25;
            from.x += 50;
            from.y += 50;
        } else {
            return null;
        }
        return (
            <Motion
                defaultStyle={{x: from.x, y: from.y}}
                style={{x: spring(to.x, animation_parameters), y: spring(to.y, animation_parameters)}}
            >
                {({x, y}) => {
                    if (x === to.x && y === to.y) {

                        return (<SplashAnimated size={size} color={color} target={to}
                                                handleTransitionEnd={this.transitionEnd}/>)
                    }
                    else
                        return (
                            <div style={{
                                width: size,
                                height: size,
                                background: color,
                                transform: `translate3d(${x}px, ${y}px, 0`,
                                WebkitTransform: `translate3d(${x}px, ${y}px, 0`,
                                borderRadius: '50%',
                                position: 'absolute',
                                textAlign: 'center',
                                lineHeight: size,
                                zIndex: 10
                            }}>
                                {count}
                            </div>
                        )
                }
                }
            </Motion>


        );

    }
}

BubbleAnimated.propTypes = {
    size: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    handleTransitionEnd: PropTypes.func.isRequired
};

export default BubbleAnimated;
