import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animate } from "react-move";
import { easeElasticInOut } from "d3-ease";
import { Motion, spring } from "react-motion";
import SplashAnimated from "./SplashAnimated";

const animation_parameters = { stiffness: 65, damping: 20 };
class BubbleAnimated extends Component {
    static propTypes = {
        color: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        from: PropTypes.string.isRequired,
        handleTransitionEnd: PropTypes.func.isRequired,
        size: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired
    };
    constructor(props) {
        super(props);
        let { size, color } = props;
        let from = { x: 0, y: 0 },
            to;
        if (document.getElementById(props.from) !== null && document.getElementById(props.to) !== null) {
            from = document.getElementById(props.from).getBoundingClientRect();
            to = document.getElementById(props.to).getBoundingClientRect();
            to.x += to.width / 2;
            from.x += 50;
            from.y += 50;
        }
        this.state = {
            size: size,
            color: color,
            x: from.x,
            y: from.y
        };
    }
    transitionEnd = () => {
        this.props.handleTransitionEnd();
    };
    componentDidMount() {
        let from, to;
        if (document.getElementById(this.props.from) !== null && document.getElementById(this.props.to) !== null) {
            from = document.getElementById(this.props.from).getBoundingClientRect();
            to = document.getElementById(this.props.to).getBoundingClientRect();
            to.x += to.width / 2;
            from.x += 50;
            from.y += 50;
            this.setState({
                x: to.x,
                y: to.y
            });
        }
    }
    render() {
        let { count, queue } = this.props;
        let { size, color, x, y } = this.state;
        return (
            <div>
                <Animate
                    start={{
                        x: x,
                        y: y,
                        opacity: 1,
                        scale: 1
                    }}
                    update={[
                        {
                            x: [x],
                            y: [y],
                            scale: 1,
                            timing: {
                                duration: 700 - 10 * queue
                            }
                        },
                        {
                            opacity: [0],
                            scale: 2,
                            timing: {
                                delay: 700 - 10 * queue,
                                duration: 700 - 10 * queue
                            },
                            events: { end: this.transitionEnd }
                        }
                    ]}
                >
                    {({ x, y, opacity, scale }) => {
                        return (
                            <div
                                style={{
                                    transform: `translate(${x}px, ${y}px) scale(${scale})`,
                                    opacity: opacity,
                                    width: size,
                                    height: size,
                                    background: color,
                                    borderRadius: "50%",
                                    position: "fixed",
                                    textAlign: "center",
                                    lineHeight: size,
                                    zIndex: 10,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "white",
                                    cursor: "pointer"
                                }}
                            >
                                {count}
                            </div>
                        );
                    }}
                </Animate>
            </div>
            // <Motion
            //     defaultStyle={{ x: from.x, y: from.y }}
            //     style={{
            //         x: spring(to.x, animation_parameters),
            //         y: spring(to.y, animation_parameters)
            //     }}
            // >
            //     {({ x, y }) => {
            //         if (x === to.x && y === to.y) {
            //             return <SplashAnimated size={size} color={color} target={to} handleTransitionEnd={this.transitionEnd} />;
            //         } else
            //             return (
            //                 <div
            //                     style={{
            //                         width: size,
            //                         height: size,
            //                         background: color,
            //                         transform: `translate3d(${x}px, ${y}px, 0`,
            //                         WebkitTransform: `translate3d(${x}px, ${y}px, 0`,
            //                         borderRadius: "50%",
            //                         position: "fixed",
            //                         textAlign: "center",
            //                         lineHeight: size,
            //                         zIndex: 10
            //                     }}
            //                 >
            //                     {count}
            //                 </div>
            //             );
            //     }}
            // </Motion>
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
