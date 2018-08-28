import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <div className="modal-backdrop">
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <button className="close" onClick={this.props.closePopup}>
                <span aria-hidden="true">×</span>
              </button>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
