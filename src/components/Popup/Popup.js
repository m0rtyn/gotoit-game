import React from 'react';
import './popup.css';
//import {ScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popupsData: []
    };

    this.closeUpperPopup = this.closeUpperPopup.bind(this);
    this.onKeypress = this.onKeypress.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.onKeypress);
  }

  createPopup(popupName, popupContent) {
    this.setState(state => {
      state.popupsData.push({ content: popupContent, name: popupName });
    });
  }

  onKeypress(event) {
    if (event.key === 'Escape') {
      this.closeUpperPopup(event);
    }
  }

  closeUpperPopup(event) {
    event.preventDefault();
    this.setState(state => {
      state.popupsData.pop();
    });
  }

  composePopups(popupsData) {
    return popupsData.map((popupData, index) => {
      return (
        <div className={'popup'} key={index} style={{ zIndex: index }}>
          {popupData.name === 'none' ? (
            ''
          ) : (
            <div className={'popup-header'}>
              <div>{popupData.name}</div>
              <div
                className={'popup-close-button'}
                onClick={this.closeUpperPopup}
              >
                <button className={'btn btn-danger'}>close</button>
              </div>
            </div>
          )}

          <div className="popup-content">{popupData.content}</div>
        </div>
      );
    });
  }

  render() {
    const { popupsData } = this.state;
    if (popupsData.length === 0) {
      return null;
    }

    return <div>{this.composePopups(popupsData)}</div>;
  }
}
