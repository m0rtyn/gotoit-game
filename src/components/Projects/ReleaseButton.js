import React, { PureComponent } from "react";
import * as PropTypes from "prop-types";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";

export class ReleaseButton extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func,
        doneQuantity: PropTypes.any,
        stage: PropTypes.any,
        type: PropTypes.any
    };

    render() {
        console.info("ReleaseButton");
        let { onClick, type, stage, doneQuantity } = this.props;
        if (!(doneQuantity > 0 && type === "own" && stage !== "fixing")) return null;
        return (
            <DefaultClickSoundButton className="btn btn-success" onClick={onClick}>
                Release!
            </DefaultClickSoundButton>
        );
    }
}
