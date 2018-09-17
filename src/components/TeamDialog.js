import React, { Component } from "react";
import { DefaultClickSoundButton } from "../game/knowledge/sounds";

class TeamDialog extends Component {
    render() {
        return (
            <div className="modal-backdrop">
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <DefaultClickSoundButton className="close" onClick={this.props.closePortal}>
                                <span aria-hidden="true">×</span>
                            </DefaultClickSoundButton>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TeamDialog;
