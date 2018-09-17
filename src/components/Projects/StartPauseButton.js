import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";

export class StartPauseButton extends Component {
    static propTypes = {
        onOpen: PropTypes.func,
        onPause: PropTypes.func,
        onUnpause: PropTypes.func,
        paused: PropTypes.bool,
        stage: PropTypes.any
    };

    render() {
        const { paused, stage, onUnpause, onOpen, onPause } = this.props;
        return (
            <span>
                {/*{project.stage}*/}
                {paused && (
                    <DefaultClickSoundButton className="btn btn-sm btn-success" onClick={onUnpause}>
                        Start
                    </DefaultClickSoundButton>
                )}
                {stage === "ready" && (
                    <DefaultClickSoundButton className="btn btn-sm btn-success" onClick={onOpen}>
                        Start
                    </DefaultClickSoundButton>
                )}
                {stage === "open" &&
                    !paused && (
                        <DefaultClickSoundButton className="btn btn-sm btn-warning" onClick={onPause}>
                            Pause
                        </DefaultClickSoundButton>
                    )}
            </span>
        );
    }
}
