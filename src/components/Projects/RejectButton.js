import React, { PureComponent } from "react";
import * as PropTypes from "prop-types";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";

export class RejectButton extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func
    };
    render() {
        return (
            <DefaultClickSoundButton className="btn btn-sm btn-danger" onClick={this.props.onClick}>
                Reject
            </DefaultClickSoundButton>
        );
    }
}
