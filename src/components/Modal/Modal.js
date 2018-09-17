import React, { Component } from "react";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";

class Modal extends Component {
    render() {
        return (
            <div className={"modal-backdrop " + this.props.className}>
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {this.props.showCloseButton ? (
                                <DefaultClickSoundButton className="close" onClick={this.props.closeModal}>
                                    ×
                                </DefaultClickSoundButton>
                            ) : (
                                ""
                            )}
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
