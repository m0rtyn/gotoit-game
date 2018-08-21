import React, { Component } from 'react';

class TeamDialog extends Component {
  render() {
    return (
      <div className="modal-backdrop">
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <button className="close" onClick={this.props.closePortal}>
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

export default TeamDialog;
