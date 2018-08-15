import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import _ from 'lodash';
import ProjectEndScreen from '../ProjectEndScreen';
import HotOffer from '../HotOffer';
import SimpleModal from '../SimpleModal';
import Resume from '../Resume';
import Offer from '../Offer';
import { FormattedDate } from 'react-intl';

class Mail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_popup: null,
      letters: null,
      show_popup: false
    };
  }
  closePopup = () => {
    this.setState({ show_popup: false });
  };
  markAllAsRead = () => {
    _.map(this.props.data.mailbox, letter => {
      letter.isRead = true;
    });
  };

  render() {
    const data = this.props.data;
    const inverted_mailbox = (() => {
      let array = [];
      for (let i = data.mailbox.length - 1; i >= 0; i--) {
        array.push(data.mailbox[i]);
      }
      return array;
    })();
    let handleClick;
    const letters = _.map(inverted_mailbox, (letter, i) => {
      switch (letter.type) {
        case 'Project report':
          handleClick = () => {
            this.setState({
              current_popup: (
                <ProjectEndScreen
                  closePopup={this.closePopup}
                  key={i}
                  project={letter.content}
                  data={this.props.data}
                />
              )
            });
            this.setState({ show_popup: true });
            letter.isRead = true;
          };
          break;

        case 'Hot offer':
          handleClick = () => {
            this.setState({
              current_popup: (
                <HotOffer
                  closePopup={this.closePopup}
                  key={i}
                  offer={letter.content}
                  data={this.props.data}
                />
              )
            });
            this.setState({ show_popup: true });
            letter.isRead = true;
          };
          break;
        case 'Resume':
          handleClick = () => {
            this.setState({
              current_popup: (
                <Resume
                  closePopup={this.closePopup}
                  key={i}
                  resume={letter.content}
                  data={this.props.data}
                />
              )
            });
            this.setState({ show_popup: true });
            letter.isRead = true;
          };
          break;
        case 'Offer':
          handleClick = () => {
            this.setState({
              current_popup: (
                <Offer
                  closePopup={this.closePopup}
                  key={i}
                  offer={letter.content}
                  data={this.props.data}
                />
              )
            });
            this.setState({ show_popup: true });
            letter.isRead = true;
          };
          break;
        default:
          break;
      }
      return (
        <div className="letter card" onClick={handleClick}>
          {letter.type === 'Resume' ? (
            <img
              className="worker-avatar"
              alt={letter.content.worker.name + ' avatar'}
              src={letter.content.worker.avatar}
            />
          ) : (
            <div className="project-avatar">
              <img
                alt={letter.content.project.name + ' avatar'}
                src={letter.content.project.avatar.platform}
              />
              <img
                alt={letter.content.project.name + ' avatar'}
                src={letter.content.project.avatar.kind}
              />
            </div>
          )}

          <span className="sender-name">{letter.content.name}</span>

          {letter.isRead ? (
            <span className="letter-type">{letter.type}</span>
          ) : (
            <strong>{letter.type}</strong>
          )}

          {/* <span className="letter-status">{letter.isRead ? 'read' : ''}</span> */}

          <span className="formatted-date">
            <FormattedDate
              value={letter.date}
              // weekday="short"
              day="numeric"
              month="short"
              // year="numeric"
              hour="numeric"
            />
          </span>
        </div>
      );
    });

    return (
      <div className="mail">
        <button className="btn btn-info btn-xs" onClick={this.markAllAsRead}>
          Mark all as read
        </button>
        {letters}
        {this.state.show_popup ? (
          <SimpleModal>{this.state.current_popup}</SimpleModal>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

Mail.propTypes = {};

export default Mail;
