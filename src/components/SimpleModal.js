import React, { Component } from 'react';

class SimpleModal extends Component {
    render() {
        return (
            <div className="modal-backdrop">
                <div className="modal">
                    <div className="modal-dialog">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default SimpleModal;