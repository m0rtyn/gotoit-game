import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animate } from "react-move";
import { easeCubicIn } from "d3-ease";
import { Motion, spring } from "react-motion";
import SplashAnimated from "./SplashAnimated";
import { sounds } from "../../game/knowledge/sounds";

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
        let { size, color, queue } = props;
        let from = { x: 0, y: 0 };
        let elementFrom = document.getElementById(props.from);
        let elementTo = document.getElementById(props.to);
        this.state = {
            elementFrom,
            elementTo
        };
        if (elementFrom) {
            from = elementFrom.getBoundingClientRect();
            this.state = {
                ...this.state,
                step: 1,
                duration: 700 - 10 * queue,
                size,
                color,
                opacity: 1,
                scale: 1,
                x: from.x + 50,
                y: from.y + 50
            };
        }
    }
    transitionEnd = () => {
        this.props.handleTransitionEnd();
    };
    movingEnd = () => {
        let { step } = this.state;
        if (step === 2) {
            return this.setState(() => ({
                opacity: 0,
                scale: 2,
                duration: this.state.duration - 300,
                step: 3
            }));
        }
        if (step === 3) {
            return this.props.handleTransitionEnd();
        }
    };
    componentDidMount() {
        let to;
        let { elementFrom, elementTo } = this.state;
        let audio = new Audio(sounds.bubble_appear);
        audio.play();
        if (elementTo) {
            to = elementTo.getBoundingClientRect();
            to.x -= to.width / 2;
            to.y -= to.height / 2;
            this.setState({
                x: to.x,
                y: to.y,
                step: 2
            });
        }
    }
    componentWillUnmount() {
        let audio = new Audio(sounds.bubble_burst);
        audio.play();
    }
    render() {
        let { count, queue } = this.props;
        let { size, color, x, y, elementFrom, elementTo, opacity, scale, duration } = this.state;
        if (!elementFrom || !elementTo) return null;
        return (
            <div>
                {/*<Animate
                    start={{
                        x: x,
                        y: y,
                        opacity: 1,
                        scale: 1,
                        duration: 700
                    }}
                    update={[
                        {
                            x: [x],
                            y: [y],
                            opacity: [opacity],
                            scale: [scale],
                            timing: {
                                duration: duration
                                // easy: easeCubicIn
                            },
                            events: { end: this.movingEnd }
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
                </Animate>*/}
            </div>
        );
    }
}

export default BubbleAnimated;
